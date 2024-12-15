import { Schema } from "mongoose";

export type TProductImage = {
    url: string;
    alt?: string;
}

export type TProductAttribute = {
    name: string;        // e.g., "Color", "Size"
    value?: string;  // For select type attributes
}

export type TProductVariant = {
    // productId: Schema.Types.ObjectId | string;
    sku: string;
    attributes: TProductAttribute[]; // e.g., [{name: "color", value: "red"}, {value: "size", value: "XL"}]
    price: number;
    quantity: number;
    status: "in_stock" | "out_of_stock" | "pre_order";
    images: string[];
    isDefault: boolean;
}

export type TProduct = {
    _id: string;
    name: string;
    description: string;
    sku: string;
    category?: string | Schema.Types.ObjectId;
    subcategory?: string | Schema.Types.ObjectId;
    brand?: string | Schema.Types.ObjectId;
    companyId: string | Schema.Types.ObjectId;
    variants: TProductVariant[];
    images: TProductImage[];
    seo?: {
        title?: string;
        description?: string;
        keywords?: string[];
    };
    // metadata?: Record<string, string | number | boolean>;
    ratingsAverage?: number;
    ratingsCount?: number;
    tags?: string[];
    isFeatured?: boolean;
    isNewArrival?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// interface ProductReview {
//     id: string;
//     productId: string;
//     variantId?: string;
//     userId: string;
//     rating: number;
//     title?: string;
//     content: string;
//     images?: string[];
//     helpful: number;
//     verified: boolean;
//     createdAt: string;
//     updatedAt: string;
// }