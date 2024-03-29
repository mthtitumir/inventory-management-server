import { Types } from "mongoose";
export type TItem = {
    product: Types.ObjectId;
    quantity: number;
    price: number;
}
export type TCart = {
    salesPerson: Types.ObjectId;
    buyer: Types.ObjectId;
    company: Types.ObjectId;
    items: TItem[];
    subTotal: number;
    total: number;
}