import { z } from 'zod';
import { flowerCategoryType, flowerFragrance, flowerSize } from './flower.constant';

const createFlowerSchema = z.object({
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
  bloomDate: z.string().datetime().optional(),
  color: z.string().optional(),
  type: z.enum([...flowerCategoryType] as [string, ...string[]]).optional(),
  size: z.enum([...flowerSize] as [string, ...string[]]).optional(),
  arrangement: z.string().optional(),
  style: z.string().optional(),
  fragrance: z.enum([...flowerFragrance] as [string, ...string[]]).optional(),
});
const updateFlowerSchema = z.object({
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
  bloomDate: z.string().datetime().optional(),
  color: z.string().optional(),
  type: z.enum([...flowerCategoryType] as [string, ...string[]]).optional(),
  size: z.enum([...flowerSize] as [string, ...string[]]).optional(),
  arrangement: z.string().optional(),
  style: z.string().optional(),
  fragrance: z.enum([...flowerFragrance] as [string, ...string[]]).optional(),
});

export const FlowerValidation = {
    createFlowerSchema,
    updateFlowerSchema
};
