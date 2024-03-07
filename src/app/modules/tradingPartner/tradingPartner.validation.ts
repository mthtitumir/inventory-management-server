import { z } from 'zod';

const CreateTradingPartnerValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    phoneNumber: z.string(),
    type: z.enum(["buyer", "supplier"]),
    businessName: z.string().optional(),
    profilePicture: z.string().optional(),
    partnerOf: z.string().optional(),
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

const UpdateTradingPartnerValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phoneNumber: z.string().optional(),
    type: z.enum(["buyer", "supplier"]).optional(),
    profilePicture: z.string().optional(),
    jobTitle: z.string().optional(),
    website: z.string().optional(),
    note: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    province: z.string().optional(),
    zip: z.string().optional(),
    country: z.string().optional(),
    level: z.string().optional(),
  }),
});

const UpdateTradingPartnerDiscountValidationSchema = z.object({
  body: z.object({
    discountId: z.string().optional(),
    coins: z.number().optional(),
    level: z.string().optional(),
  }),
});

export const TradingPartnerValidation = {
  CreateTradingPartnerValidationSchema,
  UpdateTradingPartnerValidationSchema,
  UpdateTradingPartnerDiscountValidationSchema
};
