import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  //username
  @ApiProperty({
    example: 'username',
    required: true,
    format: 'string',
    minLength: 6,
    maxLength: 24,
  })
  @IsString()
  @Length(6, 24)
  @IsNotEmpty()
  readonly username: string;

  //email
  @ApiProperty({
    example: 'example@email.com',
    required: true,
    format: 'email',
    minLength: 6,
    maxLength: 24,
  })
  @IsString()
  @IsEmail()
  @Length(6, 24)
  @IsNotEmpty()
  readonly email: string;

  //password
  @ApiProperty({
    example: 'Password123',
    required: true,
    format: 'string',
    minLength: 8,
    maxLength: 24,
  })
  @IsString()
  @Length(6, 24)
  @IsNotEmpty()
  readonly password: string;
}
