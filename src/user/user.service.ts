import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CaptchaService } from '../captcha/captcha.service';
import { Repository } from 'typeorm';
import randomInt from '../utils/random.int';
import { CreateUserDTO } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name)
    constructor (
        @InjectRepository(User) private readonly userEntity: Repository<User>,
        private readonly captchaService: CaptchaService
    ) {}

    public async createUser (body: CreateUserDTO): Promise<User> {
        const verifyResult = await this.verifyCaptcha(body.phone, body.captcha)

        if (!verifyResult) {
            this.logger.error('Phone or Captcha is error')
        }

        let user = await this.userEntity.create({
            phone: body.phone,
            password: body.password,
        })
        const userName = randomInt(Number(user.id))
        await this.userEntity.save({ ...user, name: userName})
        return user
    }

    public async getUser (query: {
        phone: string,
        captcha: string,
        imgCaptcha?: string
    }): Promise<string> {
        const verifyResult = await this.verifyCaptcha(query.phone, query.captcha, query.imgCaptcha)

        if (!verifyResult) {
            this.logger.error('Phone or Captcha is error')
        }

        // 签发token
        const token = ''
        return token
    }

    private async verifyCaptcha (phone: string, captcha: string, imgCaptcha?: string): Promise<boolean> {
        // 验证图形验证码（短信验证码发送频繁；手机号 + ip 判断）
        // 验证图形验证码
        await this.captchaService.verifyImgCaptcha(phone, imgCaptcha)
        // ...
        // 验证手机号和验证码是否正确
        await this.captchaService.verifyCaptcha(phone, captcha)
        // ...
        return true
    }
}
