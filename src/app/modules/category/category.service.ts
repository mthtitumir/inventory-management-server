import { TCategory } from './category.interface';
import { Category } from './category.model';

const createCategoryIntoDB = async (payload: TCategory) => {
  const newCategory = await Category.create(payload);
  return newCategory;
};


export const CategoryServices = {
  createCategoryIntoDB,
};
