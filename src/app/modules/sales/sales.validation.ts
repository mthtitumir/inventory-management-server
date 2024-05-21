import { z } from 'zod';

const itemSchema = z.object({
  product: z.string(),
  quantity: z.number().int().positive(),
});
const createSalesSchema = z.object({
  body: z.object({
    buyer: z.string(),
    dateOfSale: z.string().datetime(),
    items: z.array(itemSchema),
    discount: z.string().optional(),
    status: z.string().optional(),
    subTotal: z.number().positive(),
    discountUsingCode: z.number().default(0),
    discountUsingCoins: z.number().default(0),
    shippingCharge: z.number().positive().optional(),
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
