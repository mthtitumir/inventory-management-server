import { Types } from "mongoose";
export type TItem = {
    product: Types.ObjectId;
    quantity: number;
}
export type TCart = {
    salesPerson: Types.ObjectId;
    buyer: Types.ObjectId;
    company: Types.ObjectId;
    items: TItem[];
    status: 'in-progress' | 'done';
}