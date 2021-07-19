import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './configuration';
import dBConfigService from './database/le-castle.database';
import { UserModule } from './user/user.module';
import { CaptchaModule } from './captcha/captcha.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: dBConfigService,
      inject: [ConfigService],
    }),
    UserModule,
    CaptchaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
