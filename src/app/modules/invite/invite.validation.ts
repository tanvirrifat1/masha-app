import { z } from 'zod';

export const createInviteValiation = z.object({
  body: z.object({
    brand: z.string({ required_error: 'Brand is required' }),
    influencer: z.string({ required_error: 'Influencer is required' }),
  }),
});

export const InviteValiationZodSchema = {
  createInviteValiation,
};
