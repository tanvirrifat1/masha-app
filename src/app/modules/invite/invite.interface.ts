import { Types } from 'mongoose';

type IInviteStatus =
  | 'Pending'
  | 'Accepted'
  | 'Rejected'
  | 'Review'
  | 'Completed';

export type IInvite = {
  brand: Types.ObjectId;
  influencer: Types.ObjectId;
  status: IInviteStatus;
};
