import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRoles } from '@utils';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    example: 'John',
    description: 'First name of the user',
    required: false
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({
    type: String,
    example: 'Doe',
    description: 'Last name of the user',
    required: false
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: false,
  })
  @IsOptional()
  image?: Express.Multer.File;

  @ApiProperty({
    type: String,
    example: 'john.doe@example.com',
    description: 'Email address of the user',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: UserRoles.USER,
    description: 'Role of the user',
    enum: UserRoles,
    default: UserRoles.USER,
    required: false
  })
  @IsOptional()
  @IsEnum(UserRoles)
  role?: UserRoles;
}
