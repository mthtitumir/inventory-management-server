import { z } from 'zod';

const itemSchema = z.object({
  product: z.string().nonempty(),
  quantity: z.number().int().positive(),
});

const addToCartSchema = z.object({
  body: z.object({
    buyer: z.string(),
    items: z.array(itemSchema),
  }),
});


export const CartValidation = {
  addToCartSchema,
};
