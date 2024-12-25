import { Schema, model } from 'mongoose';
import { TItem, TOrder } from './order.interface';
import { orderStatusArray } from './order.constant';

export const itemSchema = new Schema<TItem>({
  productVariantId: {
    type: Schema.Types.ObjectId,
    ref: 'ProductVariant',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
    default: 1,
  },
  total: {
    type: Number,
    required: true,
    default: 1,
  },
});

const orderSchema = new Schema<TOrder>(
  {
    buyerId: { type: Schema.Types.ObjectId, ref: 'TradingPartner', required: true },
    salesPersonId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    dateOfOrder: { type: Date, required: true },
    items: [itemSchema],
    subtotal: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    shippingCharge: { type: Number, default: 0 },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: orderStatusArray,
      default: "in-review"
    },
    note: { type: String, default: '' },
  },
  { timestamps: true },
);

const Order = model<TOrder>('Order', orderSchema);

export default Order;
