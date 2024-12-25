import { z } from 'zod';

const CreateTradingPartnerValidationSchema = z.object({
  body: z.object({
    type: z.enum(['buyer', 'supplier', 'both']),
    name: z.string(),
    email: z.string().email().optional(),
    phoneNumber: z.string().optional(),
    profilePicture: z.string().optional(),
    designation: z.string().optional(),
    website: z.string().optional(),
    description: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    province: z.string().optional(),
    zip: z.string().optional(),
    country: z.string().optional(),
    businessInfo: z.object({
      name: z.string().optional(),
    }).optional()
  }),
});

const UpdateTradingPartnerValidationSchema = z.object({
  body: z.object({
    type: z.enum(['buyer', 'supplier', 'both']).optional(),
    name: z.string().optional(),
    email: z.string().email().optional(),
    phoneNumber: z.string().optional(),
    profilePicture: z.string().optional(),
    designation: z.string().optional(),
    website: z.string().optional(),
    description: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    province: z.string().optional(),
    zip: z.string().optional(),
    country: z.string().optional(),
    businessInfo: z.object({
      name: z.string().optional(),
    }).optional()
  }),
});

export const TradingPartnerValidation = {
  CreateTradingPartnerValidationSchema,
  UpdateTradingPartnerValidationSchema
};
