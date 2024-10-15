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
      default: [
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      ],
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
      // default: 'Accepted',
    },
  },
  {
    timestamps: true,
  }
);

collaborateSchema.pre('save', function (next) {
  if (this.status === 'Accomplish') {
    this.status = 'Review';
  }
  next();
});

export const Collaborate = model<ICollaboration>(
  'Collaboration',
  collaborateSchema
);
