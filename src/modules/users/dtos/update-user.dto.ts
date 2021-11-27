import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'username',
    required: true,
    format: 'string',
    minLength: 6,
    maxLength: 255,
  })
  @IsString()
  @Length(6, 255)
  readonly username: string;

  //email
  @ApiProperty({
    example: 'example@email.com',
    required: true,
    format: 'email',
    minLength: 6,
    maxLength: 255,
  })
  @IsString()
  @IsEmail()
  @Length(6, 255)
  readonly email: string;

  //password
  @ApiProperty({
    example: 'Password123',
    required: true,
    format: 'string',
    minLength: 8,
    maxLength: 255,
  })
  @IsString()
  @Length(6, 255)
  readonly password: string;
}
