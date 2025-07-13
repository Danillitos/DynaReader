import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('📚 DynaReader API')
    .setDescription(`
      O DynaReader é uma plataforma dinâmica que transforma arquivos PDF em uma experiência de leitura motivadora e interativa.
      📖 Objetivo: Facilitar e incentivar o hábito da leitura diária com estatísticas personalizadas, metas progressivas e acompanhamento do progresso em tempo real.
      🚀 Esta documentação reúne todos os endpoints necessários para gerenciar usuários, livros, progresso de leitura, notificações e muito mais.
      🔒 Atenção: Todas as rotas autenticadas requerem um token JWT válido.
      
      ---
      **Desenvolvido por Danillo M. usando NestJS + Prisma**
    `)
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
