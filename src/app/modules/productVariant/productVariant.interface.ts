import { Schema } from "mongoose";

export type TProductAttribute = {
    name: string;        // e.g., "Color", "Size"
    value?: string;  // For select type attributes
}

export type TProductVariant = {
    productId: Schema.Types.ObjectId | string;
    companyId: Schema.Types.ObjectId | string;
    sku: string;
    attributes: TProductAttribute[]; // e.g., [{name: "color", value: "red"}, {value: "size", value: "XL"}]
    price: number;
    quantity: number;
    status: "in_stock" | "out_of_stock" | "pre_order";
    images: string[];
    isDefault: boolean;
}
