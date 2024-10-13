import { Model, Types } from 'mongoose';

export type IBrand = {
  image: string;
  name: string;
  email?: string;
  whatAppNum: string;
  phnNum?: string;
  owner: string;
  country: string;
  city: string;
  address: string;
  code: string;
  category: Types.ObjectId;
  manager: string;
  instagram: string;
  tiktok?: string;
};

export type BrandModel = {} & Model<IBrand>;
