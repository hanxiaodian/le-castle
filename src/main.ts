import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerInterceptor } from './interceptor/logger.interceptor';
import { ResponseTransformInterceptor } from './interceptor/response.transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggerInterceptor())
  app.useGlobalInterceptors(new ResponseTransformInterceptor())
  await app.listen(3000);
}
bootstrap();
