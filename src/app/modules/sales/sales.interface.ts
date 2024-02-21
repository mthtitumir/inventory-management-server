import { Types } from "mongoose";

export type TSales = {
    salesPerson: Types.ObjectId;
    buyer: Types.ObjectId;
    quantity: number;
    dateOfSale: Date;
    product: Types.ObjectId;
    discount?: Types.ObjectId;
    status: string;
    subTotal: number;
    discountUsingCode?: number;
    discountUsingCoins?: number;
    shippingCharge: number;
    total: number;
    note?: string;
}