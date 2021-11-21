import { Document } from 'mongoose';

export interface IFlashSale {
  readonly flashCode: string;
  readonly quantity: number;
  readonly timeStart: Date;
  readonly timeEnd: Date;
  readonly duration: number;
}

export type IFlashSaleDoc = IFlashSale & Document;
