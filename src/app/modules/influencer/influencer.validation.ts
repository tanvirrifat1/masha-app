import { z } from 'zod';

export const InfluencerValiation = z.object({
  body: z.object({
    address: z.string(),
    image: z.array(z.string({ required_error: 'required image' })),
    whatAppNum: z
      .string({ required_error: 'required wahtapp number' })
      .min(4)
      .max(15),
    city: z.string({ required_error: 'required city' }),
    country: z.string({ required_error: 'required country' }),
    zip: z.number().optional(),
    describe: z.string({ required_error: 'required describetion' }),
    followersIG: z.number({ required_error: 'required instagram followers' }),
    followersTK: z.number().optional(),
    gender: z.enum(['male', 'female', 'other']),
    number: z.string({ required_error: 'required number' }).min(4).max(15),
    instagram: z.string({ required_error: 'required instagram' }),
    tiktok: z.string({ required_error: 'required tiktok' }),
  }),
});

export const InfluencerValiationZodSchema = {
  InfluencerValiation,
};
