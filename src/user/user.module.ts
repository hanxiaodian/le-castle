import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaptchaModule } from '../captcha/captcha.module';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CaptchaModule,
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
