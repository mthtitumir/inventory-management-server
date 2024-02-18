import { z } from 'zod';

const CreateDiscountValidationSchema = z.object({
  body: z.object({
    code: z.string(),
    type: z.enum(['amountOff', 'percentOff']),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    startTime: z.string().default('00:00').optional(),
    endTime: z.string().default('23:59').optional(),
    percentOff: z.number().default(0).optional(),
    amountOff: z.number().default(0).optional(),
    minOrderValue: z.number().default(0).optional(),
    minOrderQuantity: z.number().default(0).optional(),
    valid: z.boolean().default(true).optional(),
    limitPerCustomer: z.number().default(1).optional(),
  }),
});
const UpdateDiscountValidationSchema = z.object({
  body: z.object({
    code: z.string().optional(),
    type: z.enum(['amountOff', 'percentOff']).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    startTime: z.string().default('00:00').optional(),
    endTime: z.string().default('23:59').optional(),
    percentOff: z.number().default(0).optional(),
    amountOff: z.number().default(0).optional(),
    minOrderValue: z.number().default(0).optional(),
    minOrderQuantity: z.number().default(0).optional(),
    valid: z.boolean().default(true).optional(),
    limitPerCustomer: z.number().default(1).optional(),
  }),
});

export const DiscountValidation = {
  CreateDiscountValidationSchema,
  UpdateDiscountValidationSchema,
};
