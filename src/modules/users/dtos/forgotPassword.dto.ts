import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    example: 'example@email.com',
    format: 'email',
    uniqueItems: true,
    minLength: 8,
    maxLength: 255,
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Length(8, 255)
  readonly email: string;
}
