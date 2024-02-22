import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Company } from '../company/company.model';
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

const getSingleDiscountFromDB = async (
  companyId: string,
  discountId: string,
) => {
  const companyData = await Company.isCompanyExists(companyId);
  const discountData = await Discount.isDiscountExists(discountId);
  if (!companyData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Unauthorized staff!');
  } else if (!discountData) {
    throw new AppError(httpStatus.NOT_FOUND, "This discount doesn't exist!");
  } else {
    const result = await Discount.findById(discountId);
    return result;
  }
};

const updateDiscountIntoDB = async (
  companyId: string,
  discountId: string,
  payload: Partial<TDiscount>,
) => {
  const companyData = await Company.isCompanyExists(companyId);
  const discountData = await Discount.isDiscountExists(discountId);
  if (!companyData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Unauthorized staff!');
  } else if (!discountData) {
    throw new AppError(httpStatus.NOT_FOUND, "This discount doesn't exist!");
  } else {
    const result = await Discount.findByIdAndUpdate(discountId, payload, {
      new: true,
    });
    return result;
  }
};

export const DiscountServices = {
  addNewDiscountIntoDB,
  getAllDiscountFromDB,
  getSingleDiscountFromDB,
  updateDiscountIntoDB,
};
