import { z } from 'zod';

const CreateBuyerValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    phoneNumber: z.string(),
    profilePicture: z.string().optional(),
    customerOf: z.string().optional(),
    jobTitle: z.string().optional(),
    website: z.string().optional(),
    note: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    province: z.string().optional(),
    zip: z.string().optional(),
    country: z.string().optional(),
    discountUsed: z.array(z.string()).optional(),
    coinsEarned: z.number().optional(),
  }),
});

const UpdateBuyerValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email(),
    phoneNumber: z.string(),
    profilePicture: z.string().optional(),
    jobTitle: z.string().optional(),
    website: z.string().optional(),
    note: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    province: z.string().optional(),
    zip: z.string().optional(),
    country: z.string().optional(),
    discountUsed: z.array(z.string()).optional(),
    coinsEarned: z.number().optional(),
  }),
});

export const BuyerValidation = {
  CreateBuyerValidationSchema,
  UpdateBuyerValidationSchema,
};
