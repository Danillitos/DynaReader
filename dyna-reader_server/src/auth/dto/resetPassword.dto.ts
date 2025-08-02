import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength, Matches } from "class-validator";

export class ResetPasswordDto {

    @ApiProperty({
        description: 'Código de troca de senha.',
        example: 'GH79'
    })
    @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
    @IsString()
    code: string

    @ApiProperty({
        description: 'Senha do usuário',
        example: 'Senha1234.'

    })
    @IsString()
    @Matches(/(?=.*[a-z])/, { message: 'A senha deve conter ao menos uma letra minúscula.' })
    @Matches(/(?=.*[A-Z])/, { message: 'A senha deve conter ao menos uma letra maiúscula.' })
    @Matches(/(?=.*\d)/, { message: 'A senha deve conter ao menos um número.' })
    @Matches(/(?=.*[@$!%*?&])/, { message: 'A senha deve conter ao menos um caractere especial (@$!%*?&).' })
    @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
    newPassword: string
}