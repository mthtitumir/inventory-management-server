import { z } from 'zod';

const itemSchema = z.object({
  productVariantId: z.string(),
  quantity: z.number().int().positive(),
  price: z.number().int().positive(),
  total: z.number().int().positive(),
});

const createOrderSchema = z.object({
  body: z.object({
    buyerId: z.string(),
    salesPersonId: z.string(),
    dateOfOrder: z.string().datetime(),
    items: z.array(itemSchema),
    subTotal: z.number().positive(),
    tax: z.number().positive(),
    shippingCharge: z.number().positive().optional(),
    total: z.number().positive(),
    status: z.string().optional(),
    note: z.string().optional(),
  }),
});

// const updateOrderSchema = z.object({
//   body: z.object({
//     quantity: z.number().optional(),
//     dateOfSale: z.string().datetime().optional(),
//     product: z.string().optional(),
//   }),
// });

export const OrderValidation = {
  createOrderSchema,
  // updateOrderSchema,
};
