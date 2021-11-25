import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import {
  IsAlphanumeric,
  IsArray,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateFlashSaleDto {
  @ApiProperty({
    example: 'ABC123',
    description: 'Length above 6 character',
    minLength: 6,
    maxLength: 6,
    format: 'string',
    required: true,
  })
  @IsString()
  @Length(6, 6)
  @IsAlphanumeric()
  @IsNotEmpty()
  readonly flashCode: string;

  @ApiProperty({
    example: 10,
    minLength: 1,
    maxLength: 50,
    format: 'number',
    required: true,
  })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  readonly quantity: number;

  @ApiProperty({
    example: '["619e95de55588e6257e04730","619e9110884184bb71aaf96a"]',
    format: 'array',
    required: true,
  })
  @IsArray()
  @IsNotEmpty()
  readonly products: [type: mongoose.Schema.Types.ObjectId];

  @ApiProperty({
    example: 40,
    minLength: 1,
    maxLength: 100,
    format: 'number',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  readonly discountPercent: number;

  @ApiProperty({
    example: '2021-11-22T02:57:00.000+07:00',
    format: 'Date',
  })
  @IsDate()
  readonly timeStart: Date;

  @ApiProperty({
    example: 10,
    minLength: 1,
    maxLength: 255,
    format: 'number',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  readonly duration: number;
}
