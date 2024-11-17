import { model, Schema } from "mongoose";
import { TBrand } from "./brand.interface";

const BrandSchema = new Schema({
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    logo: { type: String },
    website: { type: String },
}, { timestamps: true });

export const Brand = model<TBrand>('Brand', BrandSchema);