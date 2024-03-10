import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SalesService } from './sales.service';
import { CustomRequest } from '../../middlewares/auth';

const addNewSales = catchAsync(async (req: CustomRequest, res) => {
  const salesPersonId = req?.user?._id;
  const companyId = req?.user?.company;
  const payload = req?.body;
  const result = await SalesService.addNewSalesIntoDB(salesPersonId, companyId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sales added successfully!',
    data: result,
  });
});

const getSingleSales = catchAsync(async (req, res) => {
  const buyerId = req.params.buyerId;
  const result = await SalesService.getSingleSalesFromDB(buyerId, req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single sales retrieved successfully!',
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

const addToCart = catchAsync(async (req: CustomRequest, res) => {
  const salesPersonId = req?.user?._id;
  const companyId = req?.user?.company;
  const payload = req?.body;
  const result = await SalesService.addToCartIntoDB(salesPersonId, companyId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Item add to cart successfully!',
    data: result,
  });
})

export const SalesController = {
  addNewSales,
  getSingleSales,
  getAllSales,
  getAllSalesHistory,
  addToCart
};
