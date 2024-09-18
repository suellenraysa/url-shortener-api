import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUrl } from "class-validator";

export class CreateUrlShortDto {
    @IsNotEmpty()
    @IsUrl()
    @ApiProperty({
        description: 'URL original a ser encurtada',
        example: 'https://www.exemplo.com/artigo/como-fazer'
    })
    urlOriginal: string;
}