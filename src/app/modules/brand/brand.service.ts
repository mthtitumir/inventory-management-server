import { TBrand } from './brand.interface';
import { Brand } from './brand.model';

const createBrandIntoDB = async (payload: TBrand) => {
  const newBrand = await Brand.create(payload);
  return newBrand;
};
const getAllBrandsFromDB = async () => {
  const result = await Brand.find();
  return result;
};


export const BrandServices = {
  createBrandIntoDB,
  getAllBrandsFromDB
};
