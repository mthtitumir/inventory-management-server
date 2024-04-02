import { Types } from "mongoose";
import { TItem } from "../sales/sales.interface";

export type TCart = {
    salesPerson: Types.ObjectId;
    buyer: Types.ObjectId;
    company: Types.ObjectId;
    items: TItem[];
}