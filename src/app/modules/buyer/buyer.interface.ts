/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TBuyer = {
  name: string;
  email: string;
  phoneNumber: string;
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

export interface BuyerModel extends Model<TBuyer> {
  //instance methods for checking if the Buyer exist
  isBuyerExists(field: Record<string, unknown>): Promise<TBuyer>;
}
