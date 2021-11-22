import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface IFlashSale {
  readonly flashCode: string;
  readonly quantity: number;
  readonly products: [mongoose.Schema.Types.ObjectId];
  readonly discountPercent: number;
  readonly timeStart: Date;
  readonly timeEnd: Date;
  readonly duration: number;
}

export type IFlashSaleDoc = IFlashSale & Document;
