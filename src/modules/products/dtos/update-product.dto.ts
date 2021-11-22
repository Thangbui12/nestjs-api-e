import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
  MinLength,
} from 'class-validator';
import * as mongoose from 'mongoose';

export class UpdateProductDto {
  @ApiProperty({
    example: 'Adidas Update',
    format: 'string',
    minLength: 2,
    maxLength: 255,
  })
  @IsOptional()
  @Length(2, 255)
  @IsString()
  readonly name?: string;

  @ApiProperty({
    example: 150,
    format: 'number',
    minimum: 0,
  })
  @Min(0)
  @IsNumber()
  @IsOptional()
  readonly price?: number;

  @ApiProperty({
    example: '61972dae73e8179d1bffc72e',
    format: 'string',
    minLength: 0,
  })
  @IsMongoId()
  @MinLength(0)
  @IsOptional()
  readonly category?: mongoose.Schema.Types.ObjectId;

  readonly images?: [];

  @ApiProperty({
    example: 20,
    minimum: 0,
    format: 'number',
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  readonly quantity?: number;

  @ApiProperty({
    example: "Product's description ",
    format: 'string',
    minLength: 6,
  })
  @IsString()
  @IsOptional()
  @MinLength(6)
  readonly description?: string;

  @ApiProperty({
    example: '61972dae73e8179d1bffc72e',
    format: 'string',
    minLength: 0,
  })
  @IsMongoId()
  @MinLength(0)
  @IsOptional()
  readonly flashSale?: mongoose.Schema.Types.ObjectId;
}
