import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginSwagger {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        description: 'Email do usuário',
        example: 'jaco.israel@email.com',})
    email: string;

    @IsNotEmpty()
    @ApiProperty({
        description: 'Senha do usuário',
        example: 'perfeito777',
      })
    password: string;
}