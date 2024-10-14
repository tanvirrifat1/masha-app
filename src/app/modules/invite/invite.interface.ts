import { Types } from 'mongoose';

type IInviteStatus = 'Pending' | 'Accepted' | 'Rejected';

export type IInvite = {
  brand: Types.ObjectId;
  influencer: Types.ObjectId;
  status: IInviteStatus;
};
