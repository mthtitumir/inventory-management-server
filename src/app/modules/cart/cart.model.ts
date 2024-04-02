import { Schema, model } from 'mongoose';
import { TCart } from './cart.interface';
import { itemSchema } from '../sales/sales.model';

const cartSchema = new Schema<TCart>(
  {
    salesPerson: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'TradingPartner',
      required: true,
    },
    company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    items: { type: [itemSchema], default: [] },
  },
  { timestamps: true },
);

const Cart = model<TCart>('Cart', cartSchema);

export default Cart;
