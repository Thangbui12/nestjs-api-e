import { Document } from 'mongoose';

export interface IUser {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly phone: string;
  readonly createdAt: string;
  readonly isAdmin: boolean;
}

export type IUserDoc = IUser & Document;
