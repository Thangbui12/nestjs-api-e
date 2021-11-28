import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface IOrder {
  readonly name: string;
  readonly items: [
    {
      product: mongoose.Schema.Types.ObjectId;

      quantity: Number;
      totalItemPrice: Number;
      name: string;
    },
  ];
  readonly voucher: mongoose.Schema.Types.ObjectId;
  readonly adress: string;
  readonly delivered: boolean;
  readonly totalQuantity: Number;
  readonly totalPayOrder: Number;
}

export type IOrderDoc = IOrder & Document;
