import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateBrandDto {

    @ApiProperty({
        type: String,
        required: true,
        example: 'BMW',
    })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({
        type: String,
        format:'binary',
        required: true,
    })
    image: Express.Multer.File
}
