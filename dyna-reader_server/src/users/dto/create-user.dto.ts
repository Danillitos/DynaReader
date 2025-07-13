import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class CreateUserDto {

    @ApiProperty({
        description: 'Email do usuário',
        example: 'joao@example.com'
    })
    @IsEmail()
    @IsNotEmpty({ message: 'O e-mail não pode estar vazio.' })
    email: string;

    @ApiProperty({
        description: 'Nome de usuário',
        example: 'joao123'
    })
    @IsString()
    @MinLength(3)
    @IsNotEmpty({ message: 'O nome de usuário não pode estar vazio.' })
    username: string;

    @ApiProperty({
        description: 'Senha do usuário',
        example: 'senha123'
    })
    @IsString()
    @MinLength(8)
    @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
    password: string;
}