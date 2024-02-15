export type TDiscount = {
  code: string;
  type: 'amountOff' | 'percentOff';
  startDate: Date;
  endDate: Date;
  startTime?: string;
  endTime?: string;
  percentOff?: number;
  amountOff?: number;
  minOrderValue?: number;
  valid?: boolean;
  limitPerCustomer?: number;
};
