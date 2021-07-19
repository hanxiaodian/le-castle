import { Injectable } from '@nestjs/common';

@Injectable()
export class CaptchaService {
    public async sendCaptcha (phone: string, ip: string): Promise<boolean> {
        // 验证验证码发送次数
        const limitResult = await this.isCanSend(phone, ip)

        if (limitResult) {
            // 生成短信验证码保存到db，并发送
            // ...
            return true
        } else {
            return this.sendImgCaptcha(phone)
        }
    }

    public async sendImgCaptcha (phone: string): Promise<boolean> {
        // 生成图形验证码
        // 保存信息到 db，并发送
        // ...
        // 
        return true
    }

    public async verifyCaptcha (phone: string, captcha: string): Promise<boolean> {
        // 验证手机号和短信验证码
        return true
    }

    public async verifyImgCaptcha (phone: string, imgCaptcha: string): Promise<boolean> {
        // 验证手机号和图形验证码
        return true
    }

    private async isCanSend (phone: string, ip: string): Promise<boolean> {
        // 判断是否达到上限
        // ...
        return true
    }
}
