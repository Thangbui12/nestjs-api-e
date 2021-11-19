import { Document } from 'mongoose';

export interface IVoucher {
  readonly code: string;
  readonly quantity: number;
  readonly discount: number;
  readonly duration: number;
  readonly timeStart: Date;
  readonly timeEnd: Date;
}

export type IVoucherDoc = IVoucher & Document;
