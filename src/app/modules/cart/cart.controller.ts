import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { CartService } from './cart.service';
import { CustomRequest } from '../../middlewares/auth';
import catchAsync from '../../utils/catchAsync';

const addToCart = catchAsync(async (req: CustomRequest, res) => {
  const salesPersonId = req?.user?._id;
  const companyId = req?.user?.company;
  const payload = req?.body;
  const result = await CartService.addItemsToCartIntoDB(
    salesPersonId,
    companyId,
    payload,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Item add to cart successfully!',
    data: result,
  });
});

const deleteFromCart = catchAsync(async (req: CustomRequest, res) => {
  const companyId = req?.user?.company;
  const payload = req?.body;
  const result = await CartService.deleteItemsFromCart(
    companyId,
    payload,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Item deleted successfully!',
    data: result,
  });
});

export const CartController = {
  addToCart,
  deleteFromCart,
};
