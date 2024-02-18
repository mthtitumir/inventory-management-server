/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TBuyer = {
  name: string;
  email: string;
  phoneNumber: string;
  profilePicture?: string;
  company?: string;
  jobTitle?: string;
  website?: string;
  note?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
};

export interface BuyerModel extends Model<TBuyer> {
  //instance methods for checking if the Buyer exist
  isBuyerExists(field: Record<string, unknown>): Promise<TBuyer>;
}
