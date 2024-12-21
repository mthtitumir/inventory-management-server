import { z } from 'zod';

const productAttributeSchema = z.object({
    name: z.string(),
    value: z.string(),
});

// Schema for creating a new product
const createProductVariantSchema = z.object({
    body: z.object({
        productId: z.string(),
        sku: z.string(),
        attributes: z.array(productAttributeSchema),
        price: z.number().default(0),
        quantity: z.number().default(0),
        status: z.enum(['in_stock', 'out_of_stock', 'pre_order']).default("in_stock"),
        images: z.array(z.string()).optional(),
        isDefault: z.boolean().default(false),
    }),
});

// Schema for updating an existing product (all fields optional)
const updateProductVariantSchema = z.object({
    body: z.object({
        sku: z.string(),
        attributes: z.array(productAttributeSchema),
        price: z.number().default(0),
        quantity: z.number().default(0),
        status: z.enum(['in_stock', 'out_of_stock', 'pre_order']).default("in_stock"),
        images: z.array(z.string()).optional(),
        isDefault: z.boolean().default(false),
    }),
});

export const ProductVariantValidation = {
    createProductVariantSchema,
    updateProductVariantSchema,
};
