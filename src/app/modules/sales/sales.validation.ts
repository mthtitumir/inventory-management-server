import { z } from 'zod';

const createSalesSchema = z.object({
  body: z.object({
    seller: z.string(),
    buyer: z.string(),
    quantity: z.number(),
    dateOfSale: z.string().datetime(),
    product: z.string(),
  }),
});

const updateSalesSchema = z.object({
  body: z.object({
    seller: z.string().optional(),
    buyer: z.string().optional(),
    quantity: z.number().optional(),
    dateOfSale: z.string().datetime().optional(),
    product: z.string().optional(),
  }),
});

export const SalesValidation = {
  createSalesSchema,
  updateSalesSchema,
};
