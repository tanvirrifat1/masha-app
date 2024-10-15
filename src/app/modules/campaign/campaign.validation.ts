import { z } from 'zod';
import { Gender } from './campaign.contant';




const dateStringSchema = z.string().refine(
  date => {
    // Regex to match the "25 Aug 2024" format
    const regex =
      /^(0?[1-9]|[12][0-9]|3[01])\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{4}$/;
    return regex.test(date);
  },
  {
    message:
      'Invalid date format, expected "DD MMM YYYY" (e.g., "25 Aug 2024")',
  }
);

const campaignValidation = z
    .object({
      image: z.string({ required_error: 'required image' }),
      brand: z.string({ required_error: 'required brand' }),
      influencer: z.string().optional(),
      name: z.string({ required_error: 'required name' }),
      startTime: dateStringSchema,
      endTime: dateStringSchema,
      address: z.string({ required_error: 'Address is required' }),
      gender: z.enum(['male', 'female', 'other']),
      dressCode: z.string({ required_error: 'Dress code is required' }),
      brandInstagram: z.string({ required_error: 'Instagram is required' }),
      collaboration: z
        .number()
        .min(0, 'Collaboration must be a positive number'),
      status: z.enum(['active', 'delete']).default('active'),
    })
    .refine(
      (data) => {
        const start = new Date(data.startTime);
        const end = new Date(data.endTime);

        return end > start;
      },
      {
        message: 'Start time should be before End time!',
      }
    )
const campaignUpdatedValidation = z
    .object({
      image: z.string({ required_error: 'required image' }),
      brand: z.string({ required_error: 'required brand' }),
      influencer: z.string().optional(),
      name: z.string({ required_error: 'required name' }),
      startTime: dateStringSchema,
      endTime: dateStringSchema,
      address: z.string({ required_error: 'Address is required' }),
      gender: z.enum(['male', 'female', 'other']),
      dressCode: z.string({ required_error: 'Dress code is required' }),
      brandInstagram: z.string({ required_error: 'Instagram is required' }),
      collaboration: z
        .number()
        .min(0, 'Collaboration must be a positive number'),
      status: z.enum(['active', 'delete']).default('active'),
    }).deepPartial()
    

export const CampaignValidationZodSchema = {
  campaignValidation,
  campaignUpdatedValidation,
};
