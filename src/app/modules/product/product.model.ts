import { Schema, model } from 'mongoose';
import { TProduct, TProductAttribute, TProductImage, TProductReview, TProductVariation } from './product.interface';

// Sub-schemas for nested types
const ProductImageSchema = new Schema<TProductImage>({
    url: { type: String, required: true },
    alt: { type: String },
});

const ProductReviewSchema = new Schema<TProductReview>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
});

const ProductAttributeSchema = new Schema<TProductAttribute>({
    name: { type: String, required: true },
    value: { type: String, required: true },
});

const ProductVariationSchema = new Schema<TProductVariation>({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    SKU: { type: String, required: true, unique: true },
    attributes: [ProductAttributeSchema],
    priceAdjustment: { type: Number, default: 0 },
    stock: {
        quantity: { type: Number, default: 0 },
        status: {
            type: String,
            enum: ['in_stock', 'out_of_stock', 'pre_order'],
            default: 'in_stock',
        },
    },
    images: [ProductImageSchema],
}, { timestamps: true });

const ProductSchema = new Schema<TProduct>({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    SKU: { type: String, unique: true, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    subcategory: { type: Schema.Types.ObjectId, ref: 'Subcategory', required: true },
    brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
    price: {
        amount: { type: Number, required: true },
        currency: { type: String, default: 'USD' },
    },
    images: [ProductImageSchema],
    variations: [ProductVariationSchema],
    reviews: [ProductReviewSchema],
    ratingsAverage: { type: Number, default: 0 },
    ratingsCount: { type: Number, default: 0 },
    tags: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
}, { timestamps: true });

export const Product = model<TProduct>('Product', ProductSchema);
