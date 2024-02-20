import { Schema, model } from 'mongoose';
import { TSales } from './sales.interface';

const salesSchema = new Schema<TSales>(
  {
    seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    buyer: { type: String, required: true },
    quantity: { type: Number, required: true },
    dateOfSale: { type: Date, required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Flower', required: true },
    discount: { type: Schema.Types.ObjectId, ref: 'Discount' },
  },
  { timestamps: true }
);

const Sales = model<TSales>('Sales', salesSchema);

export default Sales;
