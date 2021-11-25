import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import {
  IsAlphanumeric,
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateFlashSaleDto {
  @ApiProperty({
    example: 'ABCUPD',
    description: 'Length above 6 character',
    minLength: 6,
    maxLength: 6,
    format: 'string',
  })
  @IsString()
  @Length(6, 6)
  @IsAlphanumeric()
  @IsOptional()
  readonly flashCode?: string;

  @ApiProperty({
    example: '["619e95de55588e6257e04730","619e9110884184bb71aaf96a"]',
    format: 'array',
    required: true,
  })
  @IsArray()
  @IsOptional()
  readonly products?: [mongoose.Schema.Types.ObjectId];

  @ApiProperty({
    example: 5,
    minLength: 1,
    maxLength: 50,
    format: 'number',
  })
  @IsNumber()
  @Length(1, 50)
  @IsOptional()
  readonly quantity?: number;

  @ApiProperty({
    example: 40,
    minLength: 1,
    maxLength: 100,
    format: 'number',
    required: true,
  })
  @IsNumber()
  @Length(1, 100)
  @IsOptional()
  readonly discountPercent?: number;

  @ApiProperty({
    example: '2021-11-24T02:57:00.000+08:00',
    format: 'Date',
  })
  @IsDate()
  @IsOptional()
  readonly timeStart?: Date;

  @ApiProperty({
    example: '2021-11-30T02:57:00.000+08:00',
    format: 'Date',
  })
  @IsDate()
  @IsOptional()
  readonly timeEnd?: Date;

  @ApiProperty({
    example: 5,
    minLength: 1,
    maxLength: 255,
    format: 'number',
  })
  @IsNumber()
  @Length(1, 255)
  @IsOptional()
  readonly duration?: number;
}
