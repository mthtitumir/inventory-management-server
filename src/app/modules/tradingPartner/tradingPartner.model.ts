import { Schema, model } from 'mongoose';
import {
  TradingPartnerModel,
  TTradingPartner,
} from './tradingPartner.interface';

const tradingPartnerSchema = new Schema<TTradingPartner>({
  type: { type: String, enum: ['buyer', 'supplier', 'both'], required: true },
  name: { type: String, required: true },
  email: { type: String },
  phoneNumber: { type: String },
  profilePicture: { type: String },
  partnerOf: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  designation: { type: String },
  website: { type: String },
  description: { type: String },
  address: { type: String },
  city: { type: String },
  province: { type: String },
  zip: { type: String },
  country: { type: String },
  businessInfo: {
    name: { type: String },
  }
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
