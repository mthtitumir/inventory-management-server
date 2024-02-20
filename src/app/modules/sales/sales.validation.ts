import { z } from 'zod';

const createSalesSchema = z.object({
  body: z.object({
    salesPerson: z.string(),
    buyer: z.string(),
    quantity: z.number(),
    dateOfSale: z.string().datetime(),
    product: z.string(),
    discount: z.string().optional(),
  }),
});

const updateSalesSchema = z.object({
  body: z.object({
    quantity: z.number().optional(),
    dateOfSale: z.string().datetime().optional(),
    product: z.string().optional(),
  }),
});

export const SalesValidation = {
  createSalesSchema,
  updateSalesSchema,
};
