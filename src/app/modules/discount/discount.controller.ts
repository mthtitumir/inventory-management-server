import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { DiscountServices } from './discount.service';
import { CustomRequest } from '../../middlewares/auth';

const addNewDiscount = catchAsync(async (req: CustomRequest, res) => {
  const discountData = {...req.body, company: req?.user?.company};
  
  const result = await DiscountServices.addNewDiscountIntoDB(discountData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Discount added successfully!',
    data: result,
  });
});

const getAllDiscount = catchAsync(async (req: CustomRequest, res) => {
  const result = await DiscountServices.getAllDiscountFromDB(req?.user?.company);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Discounts retrieved successfully!',
    data: result,
  });
});

const getSingleDiscount = catchAsync(async (req, res) => {
  const result = await DiscountServices.getSingleDiscountFromDB(req?.params?.discountCode);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Discount retrieved successfully!',
    data: result,
  });
});

const updateDiscount = catchAsync(async (req: CustomRequest, res) => {
  const discountId = req?.params?.discountId;
  const company = req?.user?.company;
  const updatedData = req?.body;
  const result = await DiscountServices.updateDiscountIntoDB(
    company,
    discountId,
    updatedData,
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
