import { Schema, model } from "mongoose"
import { TDiscount } from "./discount.interface"

const discountSchema = new Schema<TDiscount>(
  {
    code: {type: String, required: true},
    type: {
      type: String,
      enum: ['amountOff', 'percentOff'],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    startTime: { type: String, default: "00:00" },
    endTime: { type: String, default: "23:59" },
    percentOff: {
      type: Number,
      default: 0,
    },
    amountOff: {
      type: Number,
      default: 0,
    },
    minOrderValue: {
      type: Number,
      default: 0,
    },
    valid: {
      type: Boolean,
      default: true,
    },
    limitPerCustomer: {
        type: Number,
        default: 1,
    }
  },
  { timestamps: true }
)

export const Discount = model("Discount", discountSchema);
