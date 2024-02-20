import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BuyerServices } from './buyer.service';

const addNewBuyer = catchAsync(async (req, res) => {
  const result = await BuyerServices.addNewBuyerIntoDB(req?.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Buyer added successfully!',
    data: result,
  });
});

const getAllBuyer = catchAsync(async (req, res) => {
    // filter/query must be refactored
  const result = await BuyerServices.getAllBuyerFromDB({...req?.query});

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Buyers retrieved successfully!',
    data: result,
  });
});

const getSingleBuyer = catchAsync(async (req, res) => {
  const result = await BuyerServices.getSingleBuyerFromDB(req?.params?.buyerId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Buyer retrieved successfully!',
    data: result,
  });
});

const updateBuyer = catchAsync(async (req, res) => {
  const BuyerId = req?.params?.BuyerId;
  const result = await BuyerServices.updateBuyerIntoDB(
    BuyerId,
    req?.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Buyer updated successfully!',
    data: result,
  });
});

export const BuyerControllers = {
  addNewBuyer,
  getAllBuyer,
  getSingleBuyer,
  updateBuyer,
};
