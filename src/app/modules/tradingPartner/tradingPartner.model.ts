import { Schema, model } from 'mongoose';
import {
  TradingPartnerModel,
  TTradingPartner,
} from './tradingPartner.interface';

const tradingPartnerSchema = new Schema<TTradingPartner>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  type: { type: String, enum: ["buyer", "supplier"], required: [true, "Trading partner type is required!"] },
  businessName: { type: String, default: 'N/A' },
  profilePicture: { type: String },
  partnerOf: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  jobTitle: { type: String },
  website: { type: String },
  note: { type: String },
  address: { type: String },
  city: { type: String },
  province: { type: String },
  zip: { type: String },
  country: { type: String },
  discountUsed: {
    type: [String],
    default: [],
  },
  coinsEarned: {
    type: Number,
    default: 0,
  },
});

tradingPartnerSchema.statics.isTradingPartnerExists = function (
  tradingPartnerId: string | Schema.Types.ObjectId,
): Promise<TTradingPartner> {
  return this.findById(tradingPartnerId);
};

export const TradingPartner = model<TTradingPartner, TradingPartnerModel>(
  'TradingPartner',
  tradingPartnerSchema,
);
