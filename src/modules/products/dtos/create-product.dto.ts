import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
  MinLength,
} from 'class-validator';
import * as mongoose from 'mongoose';

export class CreateProductDto {
  @ApiProperty({
    example: 'Adidas 1970',
    format: 'string',
    minLength: 2,
    maxLength: 255,
    required: true,
  })
  @IsString()
  @Length(2, 255)
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: 100,
    minimum: 0,
    format: 'number',
    required: true,
  })
  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty({
    example: '61972dae73e8179d1bffc72e',
    format: 'string',
    required: true,
    minLength: 0,
  })
  @IsMongoId()
  @MinLength(0)
  @IsNotEmpty()
  readonly category: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 10, format: 'number', required: true, minimum: 0 })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  readonly quantity: number;
}
