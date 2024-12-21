import { z } from 'zod';

const productImageSchema = z.object({
    url: z.string(),
    alt: z.string().optional(),
});

const productAttributeSchema = z.object({
    name: z.string(),
    value: z.string(),
});

const productVariantSchema = z.object({
    sku: z.string(),
    attributes: z.array(productAttributeSchema),
    price: z.number().default(0),
    quantity: z.number().default(0),
    status: z.enum(['in_stock', 'out_of_stock', 'pre_order']).default("in_stock"),
    images: z.array(z.string()).optional(),
    isDefault: z.boolean().default(false),
});

// Schema for creating a new product
const createProductSchema = z.object({
    body: z.object({
        name: z.string(),
        description: z.string(),
        sku: z.string(),
        category: z.string(),
        subcategory: z.string(),
        brand: z.string().optional(),
        variants: z.array(productVariantSchema).optional(),
        images: z.array(productImageSchema),
        seo: z.object({
            title: z.string().optional(),
            description: z.string().optional(),
            keywords: z.array(z.string()).optional(),
        }).optional(),
        // metadata: z.object().default({}).optional(),
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
        sku: z.string().optional(),
        category: z.string().optional(),
        subcategory: z.string().optional(),
        brand: z.string().optional(),
        variants: z.array(productVariantSchema).optional(),
        images: z.array(productImageSchema).optional(),
        seo: z.object({
            title: z.string().optional(),
            description: z.string().optional(),
            keywords: z.array(z.string()).optional(),
        }).optional(),
        // metadata: z.object().default({}).optional(),
        ratingsAverage: z.number().min(0).max(5).optional(),
        ratingsCount: z.number().int().nonnegative().optional(),
        tags: z.array(z.string()).optional(),
        isFeatured: z.boolean().optional(),
        isNewArrival: z.boolean().optional(),
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
