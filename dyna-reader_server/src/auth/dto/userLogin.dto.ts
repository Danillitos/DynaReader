import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsNotEmpty } from "class-validator";

export class UserLoginDto {

    @ApiProperty({
        description: 'Email do usuário',
        example: 'joao@example.com'})
    @IsEmail({}, { message: 'O e-mail deve ser válido.' })
    @IsNotEmpty({ message: 'O e-mail não pode estar vazio.' })
    email: string;

    @ApiProperty({
        description: 'Senha do usuário',
        example: 'senha123'})
    @IsString({ message: 'A senha deve ser uma string.' })
    @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
    password: string;
}