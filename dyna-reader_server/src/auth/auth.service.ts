import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserLoginDto } from './dto/userLogin.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}

    // Método para criar um usuário e enviar o e-mail de verificação
    async verifyEmail(token: string) {
        const user = await this.prisma.user.findUnique({
            where: { verifyToken: token },
        })

        // Verifica se o usuário existe e se o token é válido
        if (!user) {
            throw new Error('Token de verificação inválido ou expirado');
        }

        await this.prisma.user.update({
            where: { id: user.id },
            data:{ isVerified: true, verifyToken: null },
        })

        return { message: 'E-mail verificado com sucesso!' };
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
            throw new UnauthorizedException('Usuário inválido! Verifique o e-mail e a senha.');
        }

        // Verifica se a senha está correta
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Usuário inválido! Verifique o e-mail e a senha.');
        }

        // Verifica se o usuário está verificado
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
