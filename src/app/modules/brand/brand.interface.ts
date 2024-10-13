import { Model } from 'mongoose';

export type IBrand = {
  image: string;
  name: string;
  email: string;
  whatAppNum: string;
  phoneNum: string;
  owner: string;
  country: string;
  city: string;
  address: string;
  code: string;
  category: string;
  manager: string;
};

export type BrandModel = {} & Model<IBrand>;
