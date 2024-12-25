import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OrderService } from './order.service';
import { CustomRequest } from '../../middlewares/auth';

const addNewOrder = catchAsync(async (req: CustomRequest, res) => {
  const companyId = req?.user?.company;
  const payload = req?.body;
  const result = await OrderService.addNewOrderIntoDB( companyId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order added successfully!',
    data: result,
  });
});

// const getSingleOrder = catchAsync(async (req, res) => {
//   const buyerId = req.params.buyerId;
//   const result = await OrderService.getSingleOrderFromDB(buyerId, req.query);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Single sales retrieved successfully!',
//     data: result,
//   });
// });

const getAllOrder = catchAsync(async (req, res) => {
  const result = await OrderService.getAllOrderFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Order retrieved successfully!',
    data: result,
  });
});

const getAllOrderHistory = catchAsync(async (req, res) => {
  const result = await OrderService.getOrderHistoryFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Order retrieved successfully!',
    data: result,
  });
});

export const OrderController = {
  addNewOrder,
  // getSingleOrder,
  getAllOrder,
  getAllOrderHistory,
};
