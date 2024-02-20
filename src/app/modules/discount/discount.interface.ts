import { Types } from "mongoose";

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
