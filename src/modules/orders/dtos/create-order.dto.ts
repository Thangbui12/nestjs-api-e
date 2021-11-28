import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import * as mongoose from 'mongoose';

export class CreateOrderDto {
  @ApiProperty({
    example: [
      {
        product: '61a0d1d1668f58c5396509f0',
        quantity: 2,
      },
      {
        product: '61a0d1f1668f58c5396509f3',
        quantity: 4,
      },
      {
        product: '61a0d25c668f58c5396509f9',
        quantity: 3,
      },
    ],
    format: 'array',
    required: true,
  })
  @IsArray()
  @IsNotEmpty()
  readonly items: [
    {
      product: mongoose.Schema.Types.ObjectId;
      quantity: number;
      totalItemPrice: number;
      name: string;
    },
  ];

  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({
    example: '61a0d1f1668f58c5396509f3',
    format: 'string',
    required: true,
  })
  readonly voucher: mongoose.Schema.Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '123, ngo 86 Mia, Mai, HN',
    format: 'string',
    required: true,
  })
  readonly address: string;
}
