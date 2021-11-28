import { Document } from 'mongoose';
import { userRole } from 'src/common/common.constans';
import * as mongoose from 'mongoose';

export interface IUser {
  readonly username: string;
  readonly email: string;
  password: string;
  readonly phone: string;
  readonly createdAt: string;
  readonly role: userRole;
  readonly avatar: string;
  salt: string;
  readonly vouchers: [mongoose.Schema.Types.ObjectId];
  readonly orders: [mongoose.Schema.Types.ObjectId];
}

export type IUserDoc = IUser & Document;
