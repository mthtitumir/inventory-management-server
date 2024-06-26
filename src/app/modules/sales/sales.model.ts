import { Schema, model } from 'mongoose';
import { TItem, TSales } from './sales.interface';
import { orderStatusArray } from './sales.constant';

export const itemSchema = new Schema<TItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Flower',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const salesSchema = new Schema<TSales>(
  {
    salesPerson: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    buyer: { type: Schema.Types.ObjectId, ref: 'TradingPartner', required: true },
    company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    dateOfSale: { type: Date, required: true },
    items: [itemSchema],
    discount: { type: Schema.Types.ObjectId, ref: 'Discount' },
    status: {
      type: String,
      enum: orderStatusArray,
      default: "in-review"
    },
    subTotal: { type: Number, required: true },
    discountUsingCode: { type: Number, default: 0 },
    discountUsingCoins: { type: Number, default: 0 },
    shippingCharge: { type: Number, default: 0 },
    total: { type: Number, required: true },
    note: { type: String, default: '' },
  },
  { timestamps: true },
);

const Sales = model<TSales>('Sales', salesSchema);

export default Sales;
