import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService, private readonly mailService: MailService) {}

    // Serviço para criar um usuário
    async createUserService(createrUserDto: CreateUserDto) {
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

        // Gera um token único para verificação de e-mail
        const token = uuidv4();
        const now = new Date();
        const expiresIn = new Date(now.getTime() + 24 * 60 * 60 * 1000); // Token válido por 24 horas

        // Cria o usuário no banco de dados
        const user = await this.prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                verifyToken: token,
                verifySendAt: now,
                verifyTokenExpiresAt: expiresIn,
            }
        })

        await this.mailService.sendVerificationEmail(email, token);

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            message: 'Usuário criado com sucesso! 🎉 Verifique seu E-mail para confirmação de conta.',
        }
    }

    // Serviço para buscar todos os usuários
    async findAll() {
        return await this.prisma.user.findMany({
            select: {
                id: true,
                username: true,
                email: true,
            },
        });
    }

    // Serviço para buscar um usuário por ID
    async findOne(id: number) {
        return this.prisma.user.findMany({
            where: { id },
            select: {
                id: true,
                username: true,
                email: true,
            }
        })
    }

    async updateUser(id: number, updateUserDto: any) {
        const { password, ...data } = updateUserDto

        // Verifica se o usuário existe
        const user = await this.prisma.user.findUnique({
            where: { id }
        })

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        // Pega os dados a serem atualizados
        const dataToUpdate: any = { ...data }

        // Salva a nova senha criptografada, se fornecida
        if (password) {
            const saltRounds = 10;
            dataToUpdate.password = await bcrypt.hash(password, saltRounds);
        }

        return await this.prisma.user.update({
            where: { id },
            data: dataToUpdate,
        })
    }

    async deleteUser(id: number) {
        const user = await this.prisma.user.findUnique({
            where: { id }
        });

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        await this.prisma.user.delete({
            where: { id }
        });

        return { message: 'Usuário deletado com sucesso!' };
    }
}
