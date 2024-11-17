import { z } from "zod";

const createBrandSchema = z.object({
    body: z.object({
        name: z.string(),
        description: z.string(),
    }),
});

export const BrandValidation = {
    createBrandSchema,
};
