import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface IProduct {
  readonly name: string;
  readonly price: number;
  readonly category: mongoose.Schema.Types.ObjectId;
  readonly images: [string];
  readonly quantity: number;
  readonly description: string;
  readonly flashSale?: mongoose.Schema.Types.ObjectId;
}

export type IProductDoc = IProduct & Document;
