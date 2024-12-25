import { Types } from "mongoose";

export type TPayment = {
    _id: Types.ObjectId;
    orderId: Types.ObjectId;
    amount: number;
    method: string; // 'credit_card' | 'cash' | 'bank_transfer'
    status: string; // 'pending' | 'completed' | 'failed'
    transactionId: string; // Payment gateway reference
    createdAt: Date;
    updatedAt: Date;
}
