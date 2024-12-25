/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TTradingPartner = {
  _id?: string | Types.ObjectId;
  type: 'buyer' | 'supplier' | 'both';
  name: string;
  email: string;
  phoneNumber: string;
  profilePicture?: string;
  partnerOf?: Types.ObjectId | string;
  designation?: string;
  website?: string;
  description?: string;
  address?: string;
  city?: string;
  province?: string;
  zip?: string;
  country?: string;
  businessInfo?: {
    name?: string;
  };
};

export interface TradingPartnerModel extends Model<TTradingPartner> {
  //instance methods for checking if the TradingPartner exist
  isTradingPartnerExists(tradingPartnerId: string | Types.ObjectId): Promise<TTradingPartner>;
}
