import { Schema, model } from 'mongoose';
import { BuyerModel, TBuyer } from './buyer.interface';

const buyerSchema = new Schema<TBuyer>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  profilePicture: { type: String },
  customerOf: { type: Schema.Types.ObjectId, ref: "Company", required: true },
  jobTitle: { type: String },
  website: { type: String },
  note: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  postalCode: { type: String },
  country: { type: String },
  discountUsed: {
    type: [String],
    default: [],
  },
  coinsEarned: {
    type: Number,
    default: 0,
  }
});

buyerSchema.statics.isBuyerExists = function (field: Record<string, unknown>): Promise<TBuyer> {
  return this.findOne(field);
};

export const Buyer = model<TBuyer, BuyerModel>('Buyer', buyerSchema);
