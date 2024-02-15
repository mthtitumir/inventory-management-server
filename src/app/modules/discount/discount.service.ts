import { TDiscount } from './discount.interface';
import { Discount } from './discount.model';

const addNewDiscountIntoDB = async (payload: TDiscount) => {
  const result = await Discount.create(payload);
  return result;
};

const getAllDiscountFromDB = async () => {
  const result = await Discount.find({ valid: true });
  return result;
};

const getSingleDiscountFromDB = async (discountId: string) => {
  // check if the discount is available or not yet
  const result = await Discount.findById(discountId);
  return result;
};

const updateDiscountIntoDB = async (
  discountId: string,
  payload: Partial<TDiscount>,
) => {
  // check if the discount is available or not yet
  const result = await Discount.findByIdAndUpdate(discountId, payload, {
    new: true,
  });
  return result;
};

export const DiscountServices = {
  addNewDiscountIntoDB,
  getAllDiscountFromDB,
  getSingleDiscountFromDB,
  updateDiscountIntoDB,
};
