import { Schema, model } from 'mongoose';
import { ProductVariantModel, TProductAttribute, TProductVariant } from './productVariant.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const ProductAttributeSchema = new Schema<TProductAttribute>({
    name: { type: String, required: true },
    value: { type: String, required: true },
});

const ProductVariantSchema = new Schema<TProductVariant, ProductVariantModel>({
    name: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    sku: { type: String, required: true },
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

ProductVariantSchema.statics.isProductVariantExists = async function (
    productVariant: string | Schema.Types.ObjectId,
) {
    return await ProductVariant.findById(productVariant);
};

ProductVariantSchema.statics.isProductVariantsExist = async function (
    productVariants: string[] | Schema.Types.ObjectId[],
) {
    const flowers = await ProductVariant.find({ _id: { $in: productVariants } });
    if (flowers?.length === productVariants?.length) {
        return flowers;
    } else {
        throw new AppError(httpStatus.NOT_FOUND, "All the product variants doesn't exist!")
    }
};

export const ProductVariant = model<TProductVariant, ProductVariantModel>('ProductVariant', ProductVariantSchema);
