import { Types } from "mongoose";

export type TSales = {
    salesPerson: Types.ObjectId;
    buyer: Types.ObjectId;
    quantity: number;
    dateOfSale: Date;
    product: Types.ObjectId;
    discount?: Types.ObjectId;
    status: "in-review" | "processing" | "shipped" | "out-for-delivery" | "waiting-approval" | "delivered" | "cancelled" | "returned";
    subTotal: number;
    discountUsingCode?: number;
    discountUsingCoins?: number;
    shippingCharge: number;
    total: number;
    note?: string;
}