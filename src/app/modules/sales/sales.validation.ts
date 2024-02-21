import { z } from 'zod';

const createSalesSchema = z.object({
  body: z.object({
    salesPerson: z.string(),
    buyer: z.string(),
    quantity: z.number().int().positive(),
    dateOfSale: z.date(),
    product: z.string(),
    discount: z.string().optional(),
    status: z.string(),
    subTotal: z.number().positive(),
    discountAmount: z.number().default(0),
    shippingCharge: z.number().positive(),
    total: z.number().positive(),
    note: z.string().optional(),
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
