import { Document } from 'mongoose';
import { userRole } from 'src/common/common.constans';

export interface IUser {
  readonly username: string;
  readonly email: string;
  password: string;
  readonly phone: string;
  readonly createdAt: string;
  readonly role: userRole;
  readonly avatar: string;
  salt: string;
}

export type IUserDoc = IUser & Document;
