import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import { UserServices } from './user.service';
import { CustomRequest } from '../../middlewares/auth';

const createUser = catchAsync(async (req: CustomRequest, res) => {
  const user = req.user;
  const result = await UserServices.createUserIntoDB(user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully!',
    data: result,
  });
});

const getAllUser = catchAsync(async (req: CustomRequest, res) => {
  const user = req?.user;
  const result = await UserServices.getAllUserFromDB(user, req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All users retrieved successfully!',
    data: result,
  });
});

const updateUser = catchAsync(async (req: CustomRequest, res) => {
  const user = req?.user;
  const id = req.params.id;
  const result = await UserServices.updateUserInDB(user, id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully!',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getAllUser,
  updateUser
};
