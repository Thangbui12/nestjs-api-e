import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    example: 'Password123',
    required: true,
    format: 'string',
    minLength: 8,
    maxLength: 40,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(40)
  readonly currentPassword: string;

  @ApiProperty({
    example: 'NewPAssword',
    required: true,
    format: 'string',
    minLength: 8,
    maxLength: 40,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(40)
  readonly newPassword: string;
}
