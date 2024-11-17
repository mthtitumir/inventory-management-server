import { z } from "zod";

const createSubcategorySchema = z.object({
    body: z.object({
        name: z.string(),
        description: z.string(),
        category: z.string(),
    }),
});

export const SubcategoryValidation = {
    createSubcategorySchema,
};
