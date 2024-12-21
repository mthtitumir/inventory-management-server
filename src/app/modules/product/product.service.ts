import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TProduct } from './product.interface';
import { Product } from './product.model';
import { JwtPayload } from 'jsonwebtoken';
import { ProductVariant } from '../productVariant/productVariant.model';
import { TProductVariant } from '../productVariant/productVariant.interface';
import mongoose from 'mongoose';
type JwtUser = (JwtPayload & { role: string; }) | undefined;

type TPayloadProduct = {
  variants: TProductVariant[];
  [key: string]: unknown;
}

const addProductToDB = async (payload: TPayloadProduct, user: JwtUser) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { variants, ...data } = payload;
    const productData = { ...data, companyId: user?.companyId };

    // Create the product and use the session to ensure it's part of the transaction
    const product = await Product.create([productData], { session });

    if (!product) {
      throw new AppError(httpStatus.NOT_MODIFIED, 'Product adding failed!');
    }

    // Prepare variants with productId and associate the session
    const variantsWithProductId = variants?.map(variant => ({
      ...variant,
      productId: product[0]?._id
    }));

    // Insert variants and associate the session
    const newVariants = await ProductVariant.insertMany(variantsWithProductId, { session });

    // If everything is successful, commit the transaction
    await session.commitTransaction();
    session.endSession(); // End the session

    return {
      product: product[0],
      newVariants
    };
  } catch (error) {
    // If anything fails, abort the transaction to roll back the changes
    await session.abortTransaction();
    session.endSession(); // End the session

    // Re-throw the error to be handled by the caller
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, `Error adding product!`);
  }
};

const deleteProductFromDB = async (productId: string) => { //no need for now
  const productData = await Product.findById(productId);
  if (!productData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product does not exist!');
  }
  const result = await Product.findByIdAndDelete(productId);
  return result;
};

const updateProductInDB = async (
  productId: string,
  productNewData: Partial<TProduct>
) => {
  const productData = await Product.findById(productId);
  if (!productData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product does not exist!');
  }
  const result = await Product.findByIdAndUpdate(productId, productNewData, {
    new: true,
  });
  return result;
};

const getSingleProductFromDB = async (productId: string) => {
  const product = await Product.findById(productId).populate("brand category subcategory");
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product does not exist!');
  }
  const mainImages = product.images.map((img) => img.url);
  const productVariants = await ProductVariant.find({ productId });
  const variantImages = productVariants.flatMap((variant) => variant.images);
  const allImages = [...mainImages, ...variantImages];
  // Calculate total quantity
  const totalQuantity = productVariants.reduce((sum, variant) => sum + (variant.quantity || 0), 0);

  // Format the response
  const response = {
    ...product.toObject(),
    allImages,
    totalQuantity,
  };

  return response;
};

const getProductsByCategoryFromDB = async (category: string) => {
  const result = await Product.find({ category });
  return result;
};

const getAllProductsFromDB = async (query: Record<string, unknown>, user: JwtUser) => {
  const {
    searchTerm = '',
    page = 1,
    limit = 20,
    sortBy,
    sortOrder = 'asc',
  } = query;

  const filter: Record<string, unknown> = { companyId: user?.companyId };
  if (query.minPrice || query.maxPrice) {
    filter.price = {
      $gte: parseInt(query.minPrice as string),
      $lte: parseInt(query.maxPrice as string),
    };
  }
  if (query.category) {
    filter.category = query.category;
  }
  if (query.subcategory) {
    filter.subcategory = query.subcategory;
  }
  if (query.brand) {
    filter.brand = query.brand;
  }

  const skip = (Number(page) - 1) * Number(limit);
  const productSearchableFields = ['name'];
  const searchQuery = Product.find({
    $or: productSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  const result = await searchQuery
    .find(filter)
    .populate("brand category subcategory")
    .sort({ [sortBy as string]: sortOrder === 'asc' ? 1 : -1 })
    .skip(skip)
    .limit(parseInt(limit as string));
  return result;
};

const bulkDeleteProductsFromDB = async (productIdArray: string[]) => {
  const result = await Product.deleteMany({ _id: { $in: productIdArray } });
  return result;
};

const getBulkProductsFromDB = async (productIds: string[]) => {
  const result = await Product.find({ _id: { $in: productIds } }).select(
    'name category price quantity description image'
  );
  return result;
};

export const ProductService = {
  addProductToDB,
  deleteProductFromDB,
  updateProductInDB,
  getSingleProductFromDB,
  getProductsByCategoryFromDB,
  getAllProductsFromDB,
  bulkDeleteProductsFromDB,
  getBulkProductsFromDB,
};
