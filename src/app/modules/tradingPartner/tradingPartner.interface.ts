/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TTradingPartner = {
  name: string;
  email: string;
  phoneNumber: string;
  type: "buyer" | "supplier";
  businessName?: string;
  profilePicture?: string;
  partnerOf?: Types.ObjectId;
  jobTitle?: string;
  website?: string;
  note?: string;
  address?: string;
  city?: string;
  province?: string;
  zip?: string;
  country?: string;
  discountUsed?: string[];
  coinsEarned?: number;
};

export interface TradingPartnerModel extends Model<TTradingPartner> {
  //instance methods for checking if the TradingPartner exist
  isTradingPartnerExists(tradingPartnerId: string | Types.ObjectId): Promise<TTradingPartner>;
}
