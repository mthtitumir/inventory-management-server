import { Schema, model } from 'mongoose';
import { TProduct, TProductAttribute, TProductImage, TProductVariant } from './product.interface';

// Sub-schemas for nested types
const ProductImageSchema = new Schema<TProductImage>({
    url: { type: String, required: true },
    alt: { type: String },
});

const ProductAttributeSchema = new Schema<TProductAttribute>({
    name: { type: String, required: true },
    value: { type: String, required: true },
});

const ProductVariantSchema = new Schema<TProductVariant>({
    // productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    sku: { type: String, required: true, unique: true },
    attributes: [ProductAttributeSchema],
    price: { type: Number, required: true },
    quantity: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ['in_stock', 'out_of_stock', 'pre_order'],
        default: 'in_stock',
    },
    images: [String],
    isDefault: { type: Boolean, default: false },
}, { timestamps: true });

const ProductSchema = new Schema<TProduct>({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    sku: { type: String, unique: true, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    subcategory: { type: Schema.Types.ObjectId, ref: 'Subcategory', required: true },
    brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
    companyId: { type: Schema.Types.ObjectId, ref: 'Company' },
    variants: [ProductVariantSchema],
    images: [ProductImageSchema],
    seo: {
        title: { type: String },
        description: { type: String },
        keywords: { type: [String] },
    },
    // metadata: { type: Object, default: {} },
    ratingsAverage: { type: Number, default: 0 },
    ratingsCount: { type: Number, default: 0 },
    tags: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
}, { timestamps: true });

export const Product = model<TProduct>('Product', ProductSchema);
