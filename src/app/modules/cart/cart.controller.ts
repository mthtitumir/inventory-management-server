import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CustomRequest } from '../../middlewares/auth';
import { CartService } from './cart.service';

const addOrUpdateCart = catchAsync(async (req: CustomRequest, res) => {
  const salesPersonId = req?.user?._id;
  const companyId = req?.user?.company;
  const payload = req?.body;
  const result = await CartService.addOrUpdateCartIntoDB(salesPersonId, companyId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Item add to cart successfully!',
    data: result,
  });
})

export const CartController = {
  addOrUpdateCart
};
