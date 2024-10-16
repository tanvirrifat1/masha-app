import { model, Schema } from 'mongoose';
import { ICollaboration } from './collaboration.interface';
import { inviteStatus } from './collaboration.constant';

const collaborateSchema = new Schema<ICollaboration>(
  {
    campaign: {
      type: Schema.Types.ObjectId,
      ref: 'Campaign',
    },
    influencer: {
      type: Schema.Types.ObjectId,
      ref: 'Influencer',
    },
    image: {
      type: [String],
    },
    instagram: {
      type: String,
    },
    tiktok: {
      type: String,
    },
    status: {
      type: String,
      enum: inviteStatus,
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

collaborateSchema.pre('save', function (next) {
  if (this.status === 'Pending') {
    this.status = 'Review';
  }
  next();
});

export const Collaborate = model<ICollaboration>(
  'Collaboration',
  collaborateSchema
);
