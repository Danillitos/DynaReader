import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}

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
}
