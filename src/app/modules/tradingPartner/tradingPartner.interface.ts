/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TTradingPartner = {
  name: string;
  email: string;
  phoneNumber: string;
  businessName?: string;
  profilePicture?: string;
  customerOf?: Types.ObjectId;
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
  isTradingPartnerExists(field: Record<string, unknown>): Promise<TTradingPartner>;
}
