import { TBrand } from "../brand/brand.interface";
import { Brand } from "../brand/brand.model";
import { TCategory } from "../category/category.interface";
import { Category } from "../category/category.model";
import { TProduct } from "../product/product.interface";
import { Product } from "../product/product.model";
import { TSubcategory } from "../subcategory/subcategory.interface";
import { Subcategory } from "../subcategory/subcategory.model";

const seedBrandIntoDB = async () => {
  const data: TBrand[] = [];
  const newSeed = await Brand.insertMany(data);
  return newSeed;
};
const seedCategoryIntoDB = async () => {
  const data: TCategory[] = [];
  const newSeed = await Category.insertMany(data);
  return newSeed;
};
const seedSubcategoryIntoDB = async () => {
  const data: TSubcategory[] = [];
  const newSeed = await Subcategory.insertMany(data);
  return newSeed;
};
const seedProductIntoDB = async () => {
  const data: TProduct[] = [];
  const newSeed = await Product.insertMany(data);
  return newSeed;
};

export const SeedServices = {
  seedBrandIntoDB,
  seedCategoryIntoDB,
  seedSubcategoryIntoDB,
  seedProductIntoDB
};
