import { TSubcategory } from './subcategory.interface';
import { Subcategory } from './subcategory.model';

const createSubcategoryIntoDB = async (payload: TSubcategory) => {
  const newSubcategory = await Subcategory.create(payload);
  return newSubcategory;
};


export const SubcategoryServices = {
  createSubcategoryIntoDB,
};
