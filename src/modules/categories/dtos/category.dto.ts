import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Cat',
    required: true,
    format: 'string',
    minLength: 2,
    maxLength: 255,
  })
  @IsString()
  @Length(2, 255)
  @IsNotEmpty()
  readonly name: string;
}

export class UpdateCategoryDto {
  @ApiProperty({
    example: 'CatDog',
    required: true,
    format: 'string',
    minLength: 2,
    maxLength: 255,
  })
  @IsString()
  @Length(2, 255)
  @IsNotEmpty()
  readonly name: string;
}
