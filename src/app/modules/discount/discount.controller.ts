import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { DiscountServices } from './discount.service';

const addNewDiscount = catchAsync(async (req, res) => {
  const result = await DiscountServices.addNewDiscountIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sales added successfully!',
    data: result,
  });
});

const getAllDiscount = catchAsync(async (req, res) => {
  const result = await DiscountServices.getAllDiscountFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Sales retrieved successfully!',
    data: result,
  });
});
const updateDiscount = catchAsync(async (req, res) => {
  const result = await DiscountServices.updateDiscountIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Sales retrieved successfully!',
    data: result,
  });
});

export const DiscountControllers = {
    addNewDiscount,
    getAllDiscount,
    updateDiscount
};
