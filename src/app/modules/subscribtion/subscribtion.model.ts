import { model, Schema } from 'mongoose';
import { ISubscribtion } from './subscribtion.interface';

const subscribationSchema = new Schema<ISubscribtion>(
  {
    status: {
      type: String,
    },
    customerId: {
      type: String,
    },
    plan: {
      type: String,
    },
    subscriptionId: {
      type: String,
    },

    priceAmount: {
      type: Number,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export const Subscribation = model<ISubscribtion>(
  'subscribation',
  subscribationSchema
);
