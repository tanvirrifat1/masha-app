import { model, Schema } from 'mongoose';
import { IInfluencer } from './influencer.interface';

const influencerShema = new Schema<IInfluencer>(
  {
    address: {
      type: String,
    },
    image: {
      type: [String],
      default: [
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      ],
    },
    whatAppNum: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    zip: {
      type: Number,
    },

    describe: {
      type: String,
    },
    followersIG: {
      type: Number,
    },
    followersTK: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    number: {
      type: String,
    },
    instagram: {
      type: String,
    },
    tiktok: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Influencer = model<IInfluencer>('Influencer', influencerShema);
