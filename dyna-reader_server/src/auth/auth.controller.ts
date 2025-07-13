import { Controller, Get, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('verify-email')
    async verifyEmail(@Query('token') token: string, @Res() res: Response) {
        await this.authService.verifyEmail(token);
        return { message: 'E-mail verificado com sucesso!' };
    }

}
