import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty } from 'class-validator';

export class RefreshDto {
  @ApiProperty({
    type: String,
    required: true,
    description: "JWT bo'lishi kerak",
  })
  @IsJWT()
  @IsNotEmpty()
  refreshToken: string;
}
