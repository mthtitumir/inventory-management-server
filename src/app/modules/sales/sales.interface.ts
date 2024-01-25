import { Types } from "mongoose";

export type TSales = {
    seller: Types.ObjectId;
    buyer: string;
    quantity: number;
    dateOfSale: Date;
    product: Types.ObjectId;
}