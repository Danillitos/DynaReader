import { Controller, Get, Query, Res, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/userLogin.dto';
import { Response } from 'express';
import { seconds, Throttle } from '@nestjs/throttler';
import { ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Throttle({
        default: {
            ttl: seconds(120),
            limit: 10
        }
    })
    @Post('login')
    @ApiOperation({ summary: 'Realiza o login do usuário' })
    @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
    @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
    @ApiResponse({ status: 403, description: 'Usuário não verificado' })
    @ApiResponse({ status: 429, description: 'Muitas tentativas, tente novamente mais tarde' })
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
      @ApiOperation({
        summary: 'Verifica o e-mail de um usuário',
        description: `Esta rota valida o e-mail do usuário usando o token único enviado por e-mail. 
                    O token expira após um período definido (ex: 24 horas).`,
    })
    @ApiQuery({
        name: 'token',
        description: 'Token único de verificação enviado por e-mail',
        required: true,
        example: '1a2b3c4d-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    })
    @ApiResponse({
        status: 200,
        description: 'E-mail verificado com sucesso',
        schema: {
        example: {
            message: 'E-mail verificado com sucesso!',
        },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Token inválido ou expirado',
        schema: {
        example: {
            statusCode: 400,
            message: 'Token de verificação inválido ou expirado',
            error: 'Bad Request',
        },
        },
    })
    async verifyEmail(@Query('token') token: string, @Res() res: Response) {
        await this.authService.verifyEmail(token);
        return { message: 'E-mail verificado com sucesso!' };
    }
}
