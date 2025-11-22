import type { TUser } from './user';

export type TOrder = {
  id: string;
  userId: string;
  user?: TUser;
  originalAmount: number;
  discount: number;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
};
