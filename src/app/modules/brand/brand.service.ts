import { TBrand } from './brand.interface';
import { Brand } from './brand.model';

const createBrandIntoDB = async (payload: TBrand) => {
  const newBrand = await Brand.create(payload);
  return newBrand;
};


export const BrandServices = {
  createBrandIntoDB,
};
