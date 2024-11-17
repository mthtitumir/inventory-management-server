import { Types } from "mongoose";

export type TSubcategory = {
    name: string;
    description:string;
    category: Types.ObjectId | string;
    createdAt: Date;
    updatedAt: Date;
}