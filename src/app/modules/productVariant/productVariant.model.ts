import { Schema, model } from 'mongoose';
import { TProductAttribute, TProductVariant } from './productVariant.interface';

const ProductAttributeSchema = new Schema<TProductAttribute>({
    name: { type: String, required: true },
    value: { type: String, required: true },
});

const ProductVariantSchema = new Schema<TProductVariant>({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
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

export const ProductVariant = model<TProductVariant>('ProductVariant', ProductVariantSchema);
