import { PartialType } from '@nestjs/mapped-types'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, MinLength, IsString } from 'class-validator'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @ApiProperty({
        description: 'Email do usuário',
        example: 'joao@example.com',
    })
    @IsEmail({}, { message: 'O e-mail deve ser válido.' })
    email?: string | undefined

    @ApiProperty({
        description: 'Nome de usuário',
        example: 'joao123',
    })
    @IsString({ message: 'O nome de usuário deve ser uma string.' })
    @MinLength(3, { message: 'O nome de usuário deve ter pelo menos 3 caracteres.' })
    username?: string | undefined

    @ApiProperty({
        description: 'Senha do usuário',
        example: 'senha123',
    })
    @IsString({ message: 'A senha deve ser uma string.' })
    @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres.' })
    password?: string | undefined
}

