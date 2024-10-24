import { model, Schema } from 'mongoose';
import { IInfluencer, TImage } from './influencer.interface';
import { Gender } from './influencer.constant';

const userImage = new Schema<TImage>({
  image1: {
    type: String,
  },
  image2: {
    type: String,
  },
  image3: {
    type: String,
  },
});

const influencerShema = new Schema<IInfluencer>(
  {
    address: {
      type: String,
    },
    image: {
      type: [String],
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
      enum: Gender,
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
