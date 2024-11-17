import { model, Schema } from "mongoose";
import { TSubcategory } from "./subcategory.interface";

const SubcategorySchema = new Schema({
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
}, { timestamps: true });

export const Subcategory = model<TSubcategory>('Subcategory', SubcategorySchema);