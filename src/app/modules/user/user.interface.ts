import { Model, Types } from 'mongoose';
import { USER_ROLES } from '../../../enums/user';

export type IUser = {
  role: USER_ROLES;
  fullName: string;
  email?: string;
  phnNum?: string;
  refferCode?: string;
  password: string;
  status: 'active' | 'delete';
  verified: boolean;
  image?: string;
  brand?: Types.ObjectId;
  influencer?: Types.ObjectId;
  authentication?: {
    isResetPassword: boolean;
    oneTimeCode: number;
    expireAt: Date;
  };
};

export type UserModal = {
  isExistUserById(id: string): any;
  isExistUserByEmail(email: string): any;
  isMatchPassword(password: string, hashPassword: string): boolean;
} & Model<IUser>;
