import { Schema, model } from 'mongoose';
import { FlowerModel, TFlower } from './flower.interface';
import {
  flowerCategoryType,
  flowerFragrance,
  flowerSize,
} from './flower.constant';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const flowerSchema = new Schema<TFlower, FlowerModel>(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      required: [true, 'Company is required!'],
    },
    supplier: {
      type: Schema.Types.ObjectId,
      ref: 'TradingPartner',
      required: [true, 'Supplier is required!'],
    },
    entryBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Entry officer is required!'],
    },
    name: { type: String, required: [true, 'Name is required!'] },
    price: { type: Number, required: [true, 'Price is required!'] },
    quantity: { type: Number, min: [0, 'Quantity cannot be less than 0!'], required: [true, 'Quantity is required!'] },
    image: { type: String, required: [true, 'Image is required!'] },
    bloomDate: { type: String },
    color: { type: String, required: [true, 'Color is required!'] },
    type: {
      type: String,
      enum: flowerCategoryType,
    },
    size: {
      type: String,
      enum: flowerSize,
      required: [true, 'Size is required!'],
    },
    arrangement: { type: String },
    style: { type: String },
    fragrance: {
      type: String,
      enum: flowerFragrance,
    },
  },
  { timestamps: true }, 
);

flowerSchema.statics.isFlowerExists = async function (
  flowerId: string | Schema.Types.ObjectId,
) {
  return await Flower.findById(flowerId);
};

flowerSchema.statics.isFlowersExist = async function (
  flowerIds: string[] | Schema.Types.ObjectId[],
) {
  const flowers = await Flower.find({ _id: { $in: flowerIds } });
  if (flowers?.length === flowerIds?.length){
    return flowers;
  } else {
    throw new AppError(httpStatus.NOT_FOUND, "All the items doesn't exist!")
  }
};

export const Flower = model<TFlower, FlowerModel>('Flower', flowerSchema);
