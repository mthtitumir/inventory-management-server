import { Schema, model } from 'mongoose';
import { TSales } from './sales.interface';
import { orderStatusArray } from './sales.constant';

const salesSchema = new Schema<TSales>(
  {
    salesPerson: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    buyer: { type: Schema.Types.ObjectId, ref: 'Buyer', required: true },
    quantity: { type: Number, required: true },
    dateOfSale: { type: Date, required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Flower', required: true },
    discount: { type: Schema.Types.ObjectId, ref: 'Discount' },
    status: { type: String, enum: orderStatusArray, required: [true, "status is required!"] },
    subTotal: { type: Number, required: true },
    discountUsingCode: { type: Number, default: 0 },
    discountUsingCoins: { type: Number, default: 0 },
    shippingCharge: { type: Number, required: true },
    total: { type: Number, required: true },
    note: {type: String, default: ""},
  },
  { timestamps: true }
);

const Sales = model<TSales>('Sales', salesSchema);

export default Sales;
