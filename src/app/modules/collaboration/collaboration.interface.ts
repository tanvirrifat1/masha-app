import { Types } from 'mongoose';

type ICollaborationStatus =
  | 'Pending'
  | 'Accepted'
  | 'Accomplish'
  | 'Review'
  | 'Completed';

export type ICollaboration = {
  brand: Types.ObjectId;
  influencer: Types.ObjectId;
  status: ICollaborationStatus;
  instagram: string;
  tiktok?: string;
  image?: [string];
};
