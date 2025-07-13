import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserLoginDto } from './dto/userLogin.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService, 
        private readonly jwtService: JwtService, 
        private readonly mailService: MailService,
    ) {}

    // Método para criar um usuário e enviar o e-mail de verificação
    async verifyEmail(token: string) {
        const user = await this.prisma.user.findUnique({
            where: { verifyToken: token },
        })

        // Verifica se o usuário existe e se o token é válido
        if (!user) {
            throw new Error('Token de verificação inválido ou expirado');
        }

        const now = new Date();
        if (user.verifyTokenExpiresAt && now > user.verifyTokenExpiresAt) {
            throw new BadRequestException('Token de verificação expirado');
        }   

        await this.prisma.user.update({
            where: { id: user.id },
            data:{ 
                isVerified: true,
                verifyToken: null,
                verifySendAt: null,
                verifyTokenExpiresAt: null,
            },
        })

        return { message: 'E-mail verificado com sucesso!' };
    }

    async resendVerificationEmail(email: string) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        })
        
        if (!user) throw new BadRequestException('Usuário não encontrado');
        if (user.isVerified) throw new BadRequestException('Usuário já verificado');

        const now = new Date();
        const cooldownMinutes = 5;
        
        if (user.verifySendAt) {
            const nextAllowed = new Date(user.verifySendAt.getTime() + cooldownMinutes * 60 * 1000);
            if (now < nextAllowed) {
                throw new BadRequestException(`Aguarde ${cooldownMinutes} minutos para reenviar o e-mail de verificação.`);
            }
        }
        

        const newToken = uuidv4();
        const expiresIn = new Date(now.getTime() + 24 * 60 * 60 * 1000); // Token válido por 24 horas

        await this.prisma.user.update({
            where: { id: user.id },
            data: { 
                verifyToken: newToken,
                verifySendAt: now,
                verifyTokenExpiresAt: expiresIn,
            },
        })

        await this.mailService.sendVerificationEmail(user.email, newToken);

        return {
            message: 'Novo e-mail de verificação enviado. Verifique sua caixa de entrada ou spam.',
        };      
    }

    // Método para login do usuário
    async login(userLoginDto: UserLoginDto) {
        const { email, password } = userLoginDto;

        if(!email || !password) {
            throw new Error('E-mail e senha são obrigatórios');
        }

        // Verifica se o usuário existe
        const user = await this.prisma.user.findUnique({
            where: { email }
        })

        // Verifica se o usuário está verificado
        if (!user) {
            await this.resendVerificationEmail(email)
            throw new UnauthorizedException('Usuário inválido! Verifique o e-mail e a senha.');
        }

        // Verifica se a senha está correta
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Usuário inválido! Verifique o e-mail e a senha.');
        }

        // Verifica se o usuário está verificado
        if (!user.isVerified) {
            await this.resendVerificationEmail(email)
            throw new UnauthorizedException('Usuário não verificado! Verifique seu e-mail para completar o cadastro.');
        }

        // Atribui ao token o ID e o nome de usuário do usuário autenticado
        const token = this.generateToken({
            sub: user.id,
            username: user.username,
        })


        return {
            token: token.access_token,
            message: 'Login realizado com sucesso! 🎉',
            id: user.id,
        };
    }

    // Método para gerar o token JWT
    generateToken(payLoad: any) {
        const safePayLoad = {
            ...payLoad,
            roles: Array.isArray(payLoad.roles) ? payLoad.roles : [payLoad.roles],
        }
        return {
            access_token: this.jwtService.sign(safePayLoad),
        }
    }
}
