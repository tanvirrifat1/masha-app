import { Types } from 'mongoose';

type ICollaborationStatus =
  | 'Pending'
  | 'Accepted'
  | 'Rejected'
  | 'Accomplish'
  | 'Review'
  | 'Completed';

export type ICollaboration = {
  campaign: Types.ObjectId;
  influencer: Types.ObjectId;
  status: ICollaborationStatus;
  instagram: string;
  tiktok?: string;
  image?: string[];
};
