import { TCategory } from './category.interface';
import { Category } from './category.model';

const createCategoryIntoDB = async (payload: TCategory) => {
  const newCategory = await Category.create(payload);
  return newCategory;
};
const getAllCategoriesFromDB = async () => {
  const result = await Category.find();
  return result;
};


export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB
};
