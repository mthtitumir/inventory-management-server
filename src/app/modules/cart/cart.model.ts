import { Schema, model } from 'mongoose';
import { TCart, TItem } from './cart.interface';

const itemSchema = new Schema<TItem>({
  product: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Flower"
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const cartSchema = new Schema<TCart>({
  salesPerson: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  buyer: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "TradingPartner",
    unique: true
  },
  company: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Company"
  },
  items: [itemSchema],
  status: {
    type: String,
    enum: ['in-progress', 'done'],
    default: "in-progress",
  }
});

// Middleware to calculate total price before saving a new item to the cart
// cartSchema.pre('save', function (this: TCart, next) {
//   this.totalPrice = this.items.reduce((total, item) => total + item.price, 0);
//   next();
// });

const Cart = model<TCart>('Cart', cartSchema);

export default Cart;
