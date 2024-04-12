import { Types } from "mongoose";

export type TItem = {
    product: Types.ObjectId;
    quantity: number;
}

export type TSales = {
    salesPerson: Types.ObjectId;
    buyer: Types.ObjectId;
    company: Types.ObjectId;
    dateOfSale: Date;
    items: TItem[];
    discount?: Types.ObjectId;
    status: "in-review" | "processing" | "shipped" | "out-for-delivery" | "waiting-approval" | "delivered" | "cancelled" | "returned";
    subTotal: number;
    discountUsingCode?: number;
    discountUsingCoins?: number;
    shippingCharge: number;
    total: number;
    note?: string;
}