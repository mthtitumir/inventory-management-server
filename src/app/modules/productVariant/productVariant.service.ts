import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TProductVariant } from './productVariant.interface';
import { ProductVariant } from './productVariant.model';
import { JwtPayload } from 'jsonwebtoken';
type JwtUser = (JwtPayload & { role: string; }) | undefined;

const addProductVariantToDB = async (payload: TProductVariant, user: JwtUser) => {
  const productData = { ...payload, companyId: user?.companyId };
  const result = await ProductVariant.create(productData);
  return result;
};

const deleteProductVariantFromDB = async (productId: string) => {
  const productData = await ProductVariant.findById(productId);
  if (!productData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product variant does not exist!');
  }
  const result = await ProductVariant.findByIdAndDelete(productId);
  return result;
};

const updateProductVariantInDB = async (
  productId: string,
  productNewData: Partial<TProductVariant>
) => {
  const productData = await ProductVariant.findById(productId);
  if (!productData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product does not exist!');
  }
  const result = await ProductVariant.findByIdAndUpdate(productId, productNewData, {
    new: true,
  });
  return result;
};

const getSingleProductVariantFromDB = async (variantId: string) => {
  const variant = await ProductVariant.findById(variantId);
  return variant;
};

export const ProductVariantService = {
  addProductVariantToDB,
  deleteProductVariantFromDB,
  updateProductVariantInDB,
  getSingleProductVariantFromDB,
};
