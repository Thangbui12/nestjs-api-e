import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateVoucherDto {
  @ApiProperty({
    example: 'WINTER',
    required: true,
    format: 'string',
    minLength: 2,
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 255)
  readonly code: string;

  @ApiProperty({
    example: 10,
    required: true,
    format: 'number',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly quantity: number;

  @ApiProperty({
    example: 50,
    required: true,
    format: 'number',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly discount: number;

  @ApiProperty({
    example: 5,
    required: true,
    format: 'number',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly duration: number;

  @ApiProperty({
    example: '2021-11-19T03:57:00+08:00',
    required: true,
    format: 'Date',
  })
  @IsDate()
  @IsNotEmpty()
  readonly timeStart: Date;
}
