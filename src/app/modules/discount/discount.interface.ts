/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export type TDiscount = {
  code: string;
  company: Types.ObjectId;
  type: 'amountOff' | 'percentOff';
  startDate: Date;
  endDate: Date;
  startTime?: string;
  endTime?: string;
  percentOff?: number;
  amountOff?: number;
  minOrderValue?: number;
  minOrderQuantity?: number;
  valid?: boolean;
  limitPerCustomer?: number;
};

export interface DiscountModel extends Model<TDiscount> {
  //instance methods for checking if the Discount exist
  isDiscountExists(discountId: string | Types.ObjectId): Promise<TDiscount>;
}
