import { Types } from 'mongoose';
export type ISubscribtion = {
  customerId: string;
  plan: string;
  subscriptionId: string;
  status: string;
  priceAmount: number;
  brand: Types.ObjectId;
};
