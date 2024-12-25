import { Types } from "mongoose";

export type TItem = {
    productVariantId: Types.ObjectId,
    quantity: number,
    price: number, // Price per item
    total: number, // quantity * price
}

export type TOrder = {
    _id: Types.ObjectId,
    buyerId: Types.ObjectId, // trading partner id
    salesPersonId: Types.ObjectId, // team member who added the order
    companyId: Types.ObjectId, // team member who added the order
    dateOfOrder: Date,
    items: TItem[],
    subtotal: number, // Sum of all items' total without tax
    tax: number, // Calculated tax
    shippingCharge: number;
    total: number, // subtotal + tax
    status: string, // 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
    note?: string,
    createdAt: Date,
    updatedAt: Date,
}
