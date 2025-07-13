import { Controller, Get, Query, Res, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/userLogin.dto';
import { Response } from 'express';
import { seconds, Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Throttle({
        default: {
            ttl: seconds(60),
            limit: 5
        }
    })
    @Post('login')
    async login(@Body() userLoginDto: UserLoginDto, @Res({ passthrough: true}) res: Response) {
        const { token, message, id } = await this.authService.login(userLoginDto)
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, 
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60, // 1 dia
        })
        return {message, token, id}
    }

    @Get('verify-email')
    async verifyEmail(@Query('token') token: string, @Res() res: Response) {
        await this.authService.verifyEmail(token);
        return { message: 'E-mail verificado com sucesso!' };
    }
}
