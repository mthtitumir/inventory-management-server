import { Schema, model } from 'mongoose';
import { TProduct, TProductImage } from './product.interface';

// Sub-schemas for nested types
const ProductImageSchema = new Schema<TProductImage>({
    url: { type: String, required: true },
    alt: { type: String },
});

const ProductSchema = new Schema<TProduct>({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    sku: { type: String, unique: true, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    subcategory: { type: Schema.Types.ObjectId, ref: 'Subcategory', required: true },
    brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
    companyId: { type: Schema.Types.ObjectId, ref: 'Company' },
    images: [ProductImageSchema],
    seo: {
        title: { type: String },
        description: { type: String },
        keywords: { type: [String] },
    },
    ratingsAverage: { type: Number, default: 0 },
    ratingsCount: { type: Number, default: 0 },
    tags: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
}, { timestamps: true });

export const Product = model<TProduct>('Product', ProductSchema);
