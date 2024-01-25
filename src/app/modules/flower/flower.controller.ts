import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FlowerService } from './flower.service';

const addFlower = catchAsync(async (req, res) => {
  const result = await FlowerService.addFlowerIntoDB();
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Course created successfully',
    data: result,
  });
});

const deleteFlower = catchAsync(async (req, res) => {
  const result = await FlowerService.addFlowerIntoDB();
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Course created successfully',
    data: result,
  });
});

const updateFlower = catchAsync(async (req, res) => {
  const result = await FlowerService.addFlowerIntoDB();
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Course created successfully',
    data: result,
  });
});

const getSingleFlower = catchAsync(async (req, res) => {
  const result = await FlowerService.addFlowerIntoDB();
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Course created successfully',
    data: result,
  });
});

const getAllFlower = catchAsync(async (req, res) => {
  const result = await FlowerService.addFlowerIntoDB();
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Course created successfully',
    data: result,
  });
});

const bulkDeleteFlower = catchAsync(async (req, res) => {
  const result = await FlowerService.addFlowerIntoDB();
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Course created successfully',
    data: result,
  });
});

export const FlowerController = {
    addFlower,
    deleteFlower,
    updateFlower,
    getSingleFlower,
    getAllFlower,
    bulkDeleteFlower
}
