import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class UpdateVoucherDto {
  @ApiProperty({
    example: 'WINTER-UPDATE',
    required: true,
    format: 'string',
  })
  @IsString()
  @IsOptional()
  @Length(2, 255)
  readonly code?: string;

  @ApiProperty({
    example: 20,
    required: true,
    format: 'number',
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  readonly quantity?: number;

  @ApiProperty({
    example: 40,
    required: true,
    format: 'number',
  })
  @Min(0)
  @IsNumber()
  @IsOptional()
  readonly discount?: number;

  @ApiProperty({
    example: 4,
    required: true,
    format: 'number',
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  readonly duration?: number;

  @ApiProperty({
    example: '2021-11-19T03:57:33.130Z',
    required: true,
    format: 'Date',
  })
  @IsDate()
  @IsOptional()
  readonly timeStart?: Date;

  @ApiProperty({
    example: '2021-11-19T03:57:33.130Z',
    required: true,
    format: 'Date',
  })
  @IsDate()
  @IsOptional()
  readonly endStart?: Date;
}
