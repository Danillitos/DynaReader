import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConflictException } from '@nestjs/common';
import { CreaterUserDto } from './dto/creater-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async createUserService(createrUserDto: CreaterUserDto) {
        const { email, username, password } = createrUserDto;

        // Validação simples dos campos
        if (!email || !username || !password) {
            throw new Error('Todos os campos são obrigatórios')
        }

        // Verifica se o email já está cadastrado
        const existingEmail = await this.prisma.user.findUnique({
            where: { email }
        })
        if (existingEmail) {
            throw new ConflictException('Endereço de E-mail já cadastrado');
        }

        // Verifica se o nome de usuário já está cadastrado
        const existingUsername = await this.prisma.user.findUnique({
            where: { username }
        })
        if (existingUsername) {
            throw new ConflictException('Nome de usuário já cadastrado');
        }

        // Criptografa a senha
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Cria o usuário no banco de dados
        const user = await this.prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            message: 'Usuário criado com sucesso! 🎉',
        }
    }
}
