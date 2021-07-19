import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import {NestInterceptor, ExecutionContext, CallHandler, Injectable} from '@nestjs/common'

export interface IResponse<T> {
    code: number
    message?: string
    result: T
}

@Injectable()
export class LoggerInterceptor<T> implements NestInterceptor<T, IResponse<T>> {

    intercept(
        context: ExecutionContext,
        next: CallHandler<T>,
    ): Observable<IResponse<T>> | Promise<Observable<IResponse<T>>> {
        const httpContext = context.switchToHttp();
        const req = httpContext.getRequest<Request>();
        const res = httpContext.getResponse();

        return next.handle().pipe(
            map((data) => {
                if (req.headers["range"]) {
                    let pageResult = req.headers['range'].split('=')[1] || '';
                    res.set('Access-Control-Expose-Headers', 'Content-Range');
                    res.set({"Content-Range": `items ${pageResult}/${data['totalCount'] ? data['totalCount'] : '*'}`});

                    data = data['list'] || []
                }
                return {
                    code: 0,
                    message: 'ok',
                    result: data,
                }
            }),
        )
    }
}
