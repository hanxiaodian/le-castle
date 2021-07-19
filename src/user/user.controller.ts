import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { CreateUserDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor (private readonly userService: UserService) {

    }
    @Get()
    async findOne (
        @Query('phone') phone: string,
        @Query('captcha') captcha: string,
        @Query('imgCaptcha') imgCaptcha?: string
    ) {
        return this.userService.getUser({ phone, captcha, imgCaptcha })
    }

    @Put()
    async create (@Body() body: CreateUserDTO) {
        return this.userService.createUser(body)
    }
}
