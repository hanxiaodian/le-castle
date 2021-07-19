import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    phone: string

    @IsString()
    @IsNotEmpty()
    captcha: string

    @IsString()
    password?: string

    @IsString()
    imgCaptcha?: string
}