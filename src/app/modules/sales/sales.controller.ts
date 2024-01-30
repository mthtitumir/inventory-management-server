import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SalesService } from './sales.service';

const addNewSales = catchAsync(async (req, res) => {
  const result = await SalesService.addNewSalesIntoDB(req?.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sales added successfully!',
    data: result,
  });
});

const getAllSales = catchAsync(async (req, res) => {
  const result = await SalesService.getAllSalesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Sales retrieved successfully!',
    data: result,
  });
});
const getAllSalesHistory = catchAsync(async (req, res) => {
  const result = await SalesService.getSalesHistoryFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Sales retrieved successfully!',
    data: result,
  });
});

export const SalesController = {
  addNewSales,
  getAllSales,
  getAllSalesHistory
};
