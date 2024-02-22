import { TDiscount } from './discount.interface';
import { Discount } from './discount.model';

const addNewDiscountIntoDB = async (payload: TDiscount) => {
  const result = await Discount.create(payload);
  return result;
};

const getAllDiscountFromDB = async (companyId: string) => {
  const result = await Discount.find({ company: companyId });
  return result;
};

const getSingleDiscountFromDB = async (discountCode: string) => {
  // check if the discount is available or not yet
  const result = await Discount.findOne({code: discountCode});
  return result;
};

const updateDiscountIntoDB = async (
  companyId: string,
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
