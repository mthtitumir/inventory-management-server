import { z } from 'zod';
import {
  flowerCategoryType,
  flowerFragrance,
  flowerSize,
} from './flower.constant';

const createFlowerSchema = z.object({
  body: z.object({
    company: z.string(),
    supplier: z.string(),
    entryBy: z.string(),
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    bloomDate: z.string().optional(),
    color: z.string(),
    type: z.enum([...flowerCategoryType] as [string, ...string[]]).optional(),
    size: z.enum([...flowerSize] as [string, ...string[]]).optional(),
    arrangement: z.string().optional(),
    style: z.string().optional(),
    fragrance: z.enum([...flowerFragrance] as [string, ...string[]]).optional(),
  }),
});

const updateFlowerSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    price: z.number().optional(),
    quantity: z.number().optional(),
    bloomDate: z.string().optional(),
    color: z.string().optional(),
    type: z.enum([...flowerCategoryType] as [string, ...string[]]).optional(),
    size: z.enum([...flowerSize] as [string, ...string[]]).optional(),
    arrangement: z.string().optional(),
    style: z.string().optional(),
    fragrance: z.enum([...flowerFragrance] as [string, ...string[]]).optional(),
  }),
});

const deleteManyFlowerSchema = z.object({
  body: z.object({
    flowerIdArray: z.array(z.string())
  })
})

export const FlowerValidation = {
  createFlowerSchema,
  updateFlowerSchema,
  deleteManyFlowerSchema
};
