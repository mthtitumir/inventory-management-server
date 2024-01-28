import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FlowerService } from './flower.service';

const addFlower = catchAsync(async (req, res) => {  
  const result = await FlowerService.addFlowerIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Flower added successfully!',
    data: result,
  });
});

const deleteFlower = catchAsync(async (req, res) => {
  const flowerId = req?.params?.flowerId;
  const result = await FlowerService.deleteFlowerFromDB(flowerId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Flower deleted successfully!',
    data: result,
  });
});

const updateFlower = catchAsync(async (req, res) => {
  const flowerId = req?.params?.flowerId;
  const result = await FlowerService.updateFlowerInDB(flowerId, req?.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Flower updated successfully!',
    data: result,
  });
});

const getSingleFlower = catchAsync(async (req, res) => {
  const result = await FlowerService.getSingleFlowerFromDB(
    req?.params?.flowerId,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Flower retrieved successfully!',
    data: result,
  });
});

const getAllFlower = catchAsync(async (req, res) => {
  const result = await FlowerService.getAllFlowerFromDB(req?.query);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Flowers retrieved successfully!',
    data: result,
  });
});

const bulkDeleteFlower = catchAsync(async (req, res) => {
  const result = await FlowerService.bulkDeleteFlowerFromDB(
    req?.body?.flowerIdArray,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Flowers deleted successfully!',
    data: result,
  });
});

export const FlowerController = {
  addFlower,
  deleteFlower,
  updateFlower,
  getSingleFlower,
  getAllFlower,
  bulkDeleteFlower,
};
