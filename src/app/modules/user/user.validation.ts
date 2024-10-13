import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    fullName: z.string({ required_error: 'Full name is required' }),
    email: z.string().optional(),
    phnNum: z.string().optional(),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const createEmployerZodSchema = z.object({
  body: z.object({
    firstName: z.string({ required_error: 'First name is required' }),
    lastName: z.string({ required_error: 'Last name is required' }),
    contact: z.string({ required_error: "'Contact is required'" }),
    address: z.string().optional(),
    certification: z.string().optional(),
    degree: z.string().optional(),
    institution: z.string().optional(),
    yearOfCompletion: z.string().optional(),
    specializations: z.string().optional(),
    skills: z.string().optional(),
    rating: z.number().min(0).default(0),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  createEmployerZodSchema,
};
