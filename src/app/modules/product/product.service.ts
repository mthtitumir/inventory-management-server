import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TProduct } from './product.interface';
import { Product } from './product.model';
import { JwtPayload } from 'jsonwebtoken';
type JwtUser = (JwtPayload & { role: string; }) | undefined;

const addProductToDB = async (payload: TProduct, user: JwtUser) => {
  const productData = { ...payload, companyId: user?.companyId };
  const result = await Product.create(productData);
  return result;
};

const deleteProductFromDB = async (productId: string) => {
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
  const productData = await Product.findById(productId);
  if (!productData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product does not exist!');
  }
  return productData;
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
