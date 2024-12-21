import { Schema } from "mongoose";

export type TProductImage = {
    url: string;
    alt?: string;
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
    images: TProductImage[];
    seo?: {
        title?: string;
        description?: string;
        keywords?: string[];
    };
    ratingsAverage?: number;
    ratingsCount?: number;
    tags?: string[];
    isFeatured?: boolean;
    isNewArrival?: boolean;
    createdAt: Date;
    updatedAt: Date;
}