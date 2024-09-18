import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Matches } from "class-validator";
import { MessagesHelper } from "src/helpers/messages.helper";
import { RegExHelper } from "src/helpers/regex.helper";


export class UpdateUsersDto {
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

    // // @IsNotEmpty()
    // @ApiProperty({ required: false }) 
    // @IsEmail()
    // email: string;

    // @IsNotEmpty()
    @Matches(RegExHelper.password, { message: MessagesHelper.PASSWORD_VALID })
    password: string;
}