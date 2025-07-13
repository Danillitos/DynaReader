import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

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
        const verifyUrl = `${process.env.APP_URL}/auth/verify-email?token=${token}`

        await this.transporter.sendMail({
            from: '"DynaReader" <no-reply@dynareader.com>',
            to,
            Subject: 'DynaReader - Verificação de E-mail',
            html: `
                <p>Ola!</p>
                <p>Obrigado por se registrar no DynaReader! Para completar o processo de registro, por favor, verifique seu e-mail clicando no link abaixo:</p>
                <a href="${verifyUrl}">Verificar E-mail</a>
            `,       
        })
    }
}
