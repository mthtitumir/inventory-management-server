import { Schema, model } from 'mongoose';
import { FlowerModel, TFlower } from './flower.interface';
import {
  flowerCategoryType,
  flowerFragrance,
  flowerSize,
} from './flower.constant';

const flowerSchema = new Schema<TFlower, FlowerModel>({
  seller: {type: Schema.Types.ObjectId, ref: "User", required: [true, "Seller is required!"]},
  name: { type: String, required: [true, "Name is required!"] },
  price: { type: Number, required: [true, "Price is required!"] },
  quantity: { type: Number, required: [true, "Quantity is required!"] },
  image: { type: String, required: [true, "Image is required!"] },
  bloomDate: { type: String },
  color: { type: String, required: [true, "Color is required!"] },
  type: {
    type: String,
    enum: flowerCategoryType,
  },
  size: { type: String, enum: flowerSize, required: [true, "Size is required!"] },
  arrangement: { type: String },
  style: { type: String },
  fragrance: {
    type: String,
    enum: flowerFragrance,
  },
}, {timestamps: true});

flowerSchema.statics.isFlowerExists = async function (flowerId: string) {
  return await Flower.findById(flowerId);
};

export const Flower = model<TFlower, FlowerModel>('Flower', flowerSchema);
