import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    example: 'newpassword',
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

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(40)
  readonly confirmNewPassword: string;
}
