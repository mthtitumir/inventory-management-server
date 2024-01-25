import { z } from 'zod';

const createSalesSchema = z.object({
  seller: z.string(),
  buyer: z.string(),
  quantity: z.number(),
  date: z.string().datetime(),
  product: z.string(),
});
const updateSalesSchema = z.object({
  seller: z.string().optional(),
  buyer: z.string().optional(),
  quantity: z.number().optional(),
  date: z.string().datetime().optional(),
  product: z.string().optional(),
});

export const SalesValidation = {
    createSalesSchema,
    updateSalesSchema
};