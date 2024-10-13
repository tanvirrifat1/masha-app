import { Model } from 'mongoose';

export type IInfluencer = {
  image: [string];
  instagram: string;
  tiktok?: string;
  followersIG: number;
  followersTK: number;
  describe: string;
  gender: 'male' | 'female' | 'other';
  number: string;
  whatAppNum: string;
  address: string;
  country: string;
  city: string;
  zip?: number;
};

export type InfluencerModel = {} & Model<IInfluencer>;
