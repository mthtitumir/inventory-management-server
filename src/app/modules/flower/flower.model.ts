import { Schema, model } from 'mongoose';
import { TFlower } from './flower.interface';
import {
  flowerCategoryType,
  flowerFragrance,
  flowerSize,
} from './flower.constant';

const flowerSchema = new Schema<TFlower>({
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
});

export const Flower = model<TFlower>('Flower', flowerSchema);
