import { z } from "zod";

const createCategorySchema = z.object({
    body: z.object({
        name: z.string(),
        description: z.string(),
    }),
});

export const CategoryValidation = {
    createCategorySchema,
};
