import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'example@email.com',
    required: true,
    format: 'email',
    minLength: 8,
    maxLength: 40,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MinLength(8)
  @MaxLength(255)
  readonly email: string;

  @ApiProperty({
    example: 'Password123',
    required: true,
    format: 'string',
    minLength: 8,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  readonly password: string;
}
