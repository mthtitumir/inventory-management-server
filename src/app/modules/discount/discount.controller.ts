import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { DiscountServices } from './discount.service';

const addNewDiscount = catchAsync(async (req, res) => {
  const result = await DiscountServices.addNewDiscountIntoDB(req?.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Discount added successfully!',
    data: result,
  });
});

const getAllDiscount = catchAsync(async (req, res) => {
  const result = await DiscountServices.getAllDiscountFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Discounts retrieved successfully!',
    data: result,
  });
});

const getSingleDiscount = catchAsync(async (req, res) => {
  const result = await DiscountServices.getSingleDiscountFromDB(req?.params?.discountId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Discount retrieved successfully!',
    data: result,
  });
});

const updateDiscount = catchAsync(async (req, res) => {
  const discountId = req?.params?.discountId;
  const result = await DiscountServices.updateDiscountIntoDB(
    discountId,
    req?.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Discount updated successfully!',
    data: result,
  });
});

export const DiscountControllers = {
  addNewDiscount,
  getAllDiscount,
  getSingleDiscount,
  updateDiscount,
};
