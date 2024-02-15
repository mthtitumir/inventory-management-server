export type TDiscount = {
    name: string;
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
    percentOff: number;
    amountOff: number;
    minOrderValue: number;
    valid: boolean;
    limitPerCustomer: number;
}