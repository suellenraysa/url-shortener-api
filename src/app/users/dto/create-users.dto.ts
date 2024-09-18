import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Matches } from "class-validator";
import { MessagesHelper } from "src/helpers/messages.helper";
import { RegExHelper } from "src/helpers/regex.helper";

export class CreateUsersDto {
    @IsNotEmpty()
    @ApiProperty({
        description: 'Primeiro nome do usuário',
        example: 'Jacó',
      })
    firstName: string;

    @IsNotEmpty()
    @ApiProperty({
        description: 'Último nome do usuário',
        example: 'Israel',
      })
    lastName: string;
    
    @IsNotEmpty()    
    @IsEmail()
    @ApiProperty({
        description: 'Email do usuário (deve ser único)',
        example: 'jaco.israel@email.com',
        uniqueItems: true,
    })
    email: string;

    @IsNotEmpty()
    // @Matches(RegExHelper.password, { message: MessagesHelper.PASSWORD_VALID })
    password: string;
}