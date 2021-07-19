import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Request, Response } from 'express'
import { ParsedUrlQueryInput, stringify } from 'querystring'
import { isEmpty } from 'lodash'

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private logger = new Logger(LoggerInterceptor.name)

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const httpContext = context.switchToHttp()
    const req = httpContext.getRequest<Request>()
    const res = httpContext.getResponse<Response>()

    const queryStr = isEmpty(req.query) ? '' : `?${stringify(req.query as ParsedUrlQueryInput)}`

    this.logger.log(
      `${req.method} ${req.path}${queryStr} ${JSON.stringify({
        ip: req.ip,
        header: req.headers,
        body: req.body,
      })}`,
      '<--',
    )

    return next.handle().pipe(
      tap((data) => {
        this.logger.log(
          `${req.method} ${req.path}${queryStr} ${res.statusCode} ${JSON.stringify({
            header: res.header,
            return: data,
          })}`,
          '-->',
        )
      }),
    )
  }
}
