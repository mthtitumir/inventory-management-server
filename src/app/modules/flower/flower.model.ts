import { Schema, model } from 'mongoose';
import { FlowerModel, TFlower } from './flower.interface';
import {
  flowerCategoryType,
  flowerFragrance,
  flowerSize,
} from './flower.constant';

const flowerSchema = new Schema<TFlower, FlowerModel>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  bloomDate: { type: Date, required: true },
  color: { type: String, required: true },
  type: {
    type: String,
    enum: flowerCategoryType,
    required: true,
  },
  size: { type: String, enum: flowerSize, required: true },
  arrangement: { type: String, required: true },
  style: { type: String, required: true },
  fragrance: {
    type: String,
    enum: flowerFragrance,
    required: true,
  },
}, {timestamps: true});

flowerSchema.statics.isFlowerExists = async function (flowerId: string) {
  return await Flower.findById(flowerId);
};

export const Flower = model<TFlower, FlowerModel>('Flower', flowerSchema);
