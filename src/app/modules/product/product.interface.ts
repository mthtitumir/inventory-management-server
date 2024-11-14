import { Schema } from "mongoose";

export type TProduct = {
    _id: string;
    name: string;
    description: string;
    SKU: string;
    category: string | Schema.Types.ObjectId;
    subcategory: string | Schema.Types.ObjectId;
    brand?: string | Schema.Types.ObjectId;
    price: {
        amount: number;
        currency: string;
    };
    images: TProductImage[];
    variations: TProductVariation[];
    reviews?: TProductReview[];
    ratingsAverage?: number;
    ratingsCount?: number;
    tags?: string[];
    isFeatured?: boolean;
    isNewArrival?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type TProductImage = {
    url: string;
    alt?: string;
}

export type TProductReview = {
    userId: string | Schema.Types.ObjectId;
    rating: number;
    comment?: string;
}

export type TProductVariation = {
    _id: string;
    productId: string | Schema.Types.ObjectId;
    SKU: string;
    attributes: TProductAttribute[];
    priceAdjustment?: number;
    stock: {
        quantity: number;
        status: 'in_stock' | 'out_of_stock' | 'pre_order';
    };
    images?: TProductImage[];
    createdAt: Date;
    updatedAt: Date;
}

export type TProductAttribute = {
    name: string;
    value: string;
}
