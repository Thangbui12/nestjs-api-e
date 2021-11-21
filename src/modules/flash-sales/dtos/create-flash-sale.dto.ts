import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsDate,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateFlashSaleDto {
  @ApiProperty({
    example: 'ABC123',
    description: 'Length above 6 character',
    minLength: 6,
    maxLength: 6,
    format: 'string',
  })
  @IsString()
  @Length(6, 6)
  @IsAlphanumeric()
  readonly flashCode: string;

  @ApiProperty({
    example: 10,
    minLength: 1,
    maxLength: 50,
    format: 'number',
  })
  @IsNumber()
  @Length(1, 50)
  readonly quantity: number;

  @ApiProperty({
    example: '2021-11-22T02:57:00.000+08:00',
    format: 'Date',
  })
  @IsDate()
  readonly timeStart: Date;

  @ApiProperty({
    example: 10,
    minLength: 1,
    maxLength: 255,
    format: 'number',
  })
  @IsNumber()
  @Length(1, 255)
  readonly duration: number;
}
