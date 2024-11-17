import { z } from "zod";

const createReviewSchema = z.object({
    body: z.object({
        userId: z.string(),
        rating: z.number().min(1).max(5),
        comment: z.string().optional(),
    })
});

const updateReviewSchema = z.object({
    body: z.object({
        rating: z.number().min(1).max(5).optional(),
        comment: z.string().optional(),
    })
});

export const ReviewValidation = {
    createReviewSchema,
    updateReviewSchema,
}
