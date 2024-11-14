import { z } from 'zod';
import { currencyEnum, stockStatusEnum } from './product.constant';

const productImageSchema = z.object({
    url: z.string().url(),
    alt: z.string().optional(),
});

const productReviewSchema = z.object({
    userId: z.string(),
    rating: z.number().min(1).max(5),
    comment: z.string().optional(),
});

const productAttributeSchema = z.object({
    name: z.string(),
    value: z.string(),
});

const productVariationSchema = z.object({
    SKU: z.string(),
    attributes: z.array(productAttributeSchema),
    priceAdjustment: z.number().optional(),
    stock: z.object({
        quantity: z.number().int().min(0),
        status: z.enum([...stockStatusEnum]),
    }),
    images: z.array(productImageSchema).optional(),
});

// Schema for creating a new product
const createProductSchema = z.object({
    body: z.object({
        name: z.string(),
        description: z.string(),
        SKU: z.string(),
        category: z.string(),
        subcategory: z.string(),
        brand: z.string().optional(),
        price: z.object({
            amount: z.number().positive(),
            currency: z.enum([...currencyEnum]),
        }),
        images: z.array(productImageSchema),
        variations: z.array(productVariationSchema),
        reviews: z.array(productReviewSchema).optional(),
        ratingsAverage: z.number().min(0).max(5).optional(),
        ratingsCount: z.number().int().nonnegative().optional(),
        tags: z.array(z.string()).optional(),
        isFeatured: z.boolean().optional(),
        isNewArrival: z.boolean().optional(),
    }),
});

// Schema for updating an existing product (all fields optional)
const updateProductSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        SKU: z.string().optional(),
        category: z.string().optional(),
        subcategory: z.string().optional(),
        brand: z.string().optional(),
        price: z.object({
            amount: z.number().positive().optional(),
            currency: z.enum([...currencyEnum]).optional(),
        }).optional(),
        images: z.array(productImageSchema).optional(),
        variations: z.array(productVariationSchema).optional(),
        reviews: z.array(productReviewSchema).optional(),
        ratingsAverage: z.number().min(0).max(5).optional(),
        ratingsCount: z.number().int().nonnegative().optional(),
        tags: z.array(z.string()).optional(),
        isFeatured: z.boolean().optional(),
        isNewArrival: z.boolean().optional(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
    }),
});

// Schema for deleting multiple products by ID
const deleteManyProductSchema = z.object({
    body: z.object({
        productIdArray: z.array(z.string()),
    }),
});

export const ProductValidation = {
    createProductSchema,
    updateProductSchema,
    deleteManyProductSchema,
};
