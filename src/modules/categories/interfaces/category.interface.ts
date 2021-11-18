import { Document } from 'mongoose';

export interface ICategory {
  readonly name: string;
}

export type ICategoryDoc = ICategory & Document;
