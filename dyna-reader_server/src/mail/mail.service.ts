import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { from, Subject } from 'rxjs';

@Injectable()
export class MailService {
    private transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
        }
    })

    async sendVerificationEmail(to: string, token: string) {
        const verifyUrl = `https://${process.env.APP_URL}/auth/verify-email?token=${token}`

        await this.transporter.sendMail({
            from: '"DynaReader" <no-reply@dynareader.com>',
            to,
            Subject: 'DynaReader - Verificação de E-mail',
            html: `
                <p>Ola!</p>
                <p>Obrigado por se registrar no DynaReader! Para completar o processo de registro, por favor, verifique seu e-mail clicando no link abaixo:</p>
                <a href="${verifyUrl}">Verificar E-mail</a>
                <p>Atenção: Este link é válido por 24 horas.</p>
                <p>Se você não se registrou no DynaReader, por favor, ignore este e-mail.</p>
                <p>Atenciosamente,</p>
                <p>DynaReader</p>
            `,       
        })
    }

    async ChangePasswordEmail(to: string, token: string) {
        const forgotPasswordUrl = `dynareader://reset-password?token=${token}`

        await this.transporter.sendMail({
            from: '"DynaReader" <no-reply@dynareader.com>',
            to,
            subject: 'DynaReader - Esqueci minha senha',
            html: `
                <p>Olá!</p>
                <p>Parece que você está tendo dificuldades para acessar sua conta DynaReader. Clique no link abaixo para alterar sua senha.</p>
                <a href="${forgotPasswordUrl}">Alterar senha</a>
                <p>Caso o botão acima não funcionar, insira esse link em seu navegador: dynareader://reset-password?token=${token}</p>
                <p>Atenção: Este link é válido por 1 hora.</p>
                <p>Se você não solicitou uma troca de senha, por favor, ignore este e-mail.</p>
                <p>Atenciosamente,</p>
                <p>DynaReader</p>
            `
        })

    }
}
