/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
type TFlowerCategoryType =
  | "Alstromerias"
  | "Calla Lillies"
  | "Carnations"
  | "Disbud Chrysanthemums"
  | "Ecuador Roses"
  | "Follage"
  | "Gerbras"
  | "Malaysian Chrysanthemums"
  | "Spray Carnations"
  | "Spray Chrysanthemums"
  | "Super Premiums"
  | "Uncategorized"
  | "Intermediate Roses"
  | "Premium Roses"
  | "Sprays"
  | "Wholesale Mixes";
  
export type TFlower = {
  company: Types.ObjectId;
  entryBy: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  image: string;
  bloomDate?: string;
  color: string;
  type: TFlowerCategoryType;
  size: 's' | 'm' | 'l' | 'xl' | 'xxl';
  arrangement?: string;
  style?: string;
  fragrance:
    | 'rose'
    | 'neroli'
    | 'jasmine'
    | 'geranium'
    | 'lavender'
    | 'ylang-ylang'
    | 'lily of the valley'
    | 'violet and peony';
};

export interface FlowerModel extends Model<TFlower> {
  isFlowerExists(flowerId: string | Types.ObjectId): Promise<TFlower>;
}
