import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class ForgotPasswordDto {

    @ApiProperty({
        description: 'Email do usuário',
        example: 'joao@example.com'
    })
    @IsEmail({},{message: 'O e-mail deve ser válido.'})
    @IsNotEmpty({message: 'O e-mail não pode estar vazio.'})
    email: string

}