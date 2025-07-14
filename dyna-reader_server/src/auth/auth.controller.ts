import { Controller, Get, Query, Res, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/userLogin.dto';
import { Response } from 'express';
import { seconds, Throttle } from '@nestjs/throttler';
import { ApiOperation, ApiResponse, ApiQuery, ApiBody } from '@nestjs/swagger';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';

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
    async verifyEmail(@Query('token') token: string) {
        await this.authService.verifyEmail(token);
        return { message: 'E-mail verificado com sucesso!' };
    }

    @Post('forgot-password')
    @ApiOperation({ summary: 'Solicitar redefinição de senha' })
    @ApiBody({
        description: 'E-mail do usuário para envio do link de redefinição de senha',
        type: ForgotPasswordDto,
    })
    @ApiResponse({
        status: 200,
        description: 'Se o e-mail estiver cadastrado, o link de redefinição é enviado',
        schema: {
        example: {
            message: 'Se o e-mail estiver cadastrado, você receberá um link para redefinir sua senha.'
        },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'E-mail inválido ou mal formatado',
    })
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
        await this.authService.forgotPassword(forgotPasswordDto)
        return { message: 'Se o e-mail estiver cadastrado, você receberá um link para redefinir sua senha.'}
    }


    
    @Post('reset-password')
    @ApiOperation({ summary: 'Resetar senha com token' })
    @ApiBody({
        description: 'Token de redefinição + nova senha',
        type: ResetPasswordDto,
    })
    @ApiResponse({
        status: 200,
        description: 'Senha redefinida com sucesso',
        schema: {
        example: {
            message: 'Senha redefinida com sucesso!',
        },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Token inválido ou expirado',
    })
    @ApiResponse({
        status: 400,
        description: 'Senha não atende requisitos mínimos',
    })
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        await this.authService.resetPassword(resetPasswordDto)
        return { message: 'Senha redefinida com sucesso! 🚀'}
    }
}
