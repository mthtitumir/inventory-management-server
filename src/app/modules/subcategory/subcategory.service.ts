import { TSubcategory } from './subcategory.interface';
import { Subcategory } from './subcategory.model';

const createSubcategoryIntoDB = async (payload: TSubcategory) => {
  const newSubcategory = await Subcategory.create(payload);
  return newSubcategory;
};
const getAllSubcategoriesFromDB = async () => {
  const result = await Subcategory.find();
  return result;
};


export const SubcategoryServices = {
  createSubcategoryIntoDB,
  getAllSubcategoriesFromDB
};
