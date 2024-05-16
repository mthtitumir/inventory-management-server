import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FlowerService } from './flower.service';
import { CustomRequest } from '../../middlewares/auth';

const addFlower = catchAsync(async (req: CustomRequest, res) => { 
  const entryBy = req?.user?._id;
  const companyId = req?.user?.company; 
  const payload = req?.body;
  const result = await FlowerService.addFlowerIntoDB(entryBy, companyId, payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Flower added successfully!',
    data: result,
  });
});

const deleteFlower = catchAsync(async (req: CustomRequest, res) => {
  const companyId = req?.user?.company;
  const flowerId = req?.params?.flowerId;
  const result = await FlowerService.deleteFlowerFromDB(flowerId, companyId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Flower deleted successfully!',
    data: result,
  });
});

const updateFlower = catchAsync(async (req: CustomRequest, res) => {
  const flowerId = req?.params?.flowerId;
  const companyId = req?.user?.company;
  const payload = req?.body;
  const result = await FlowerService.updateFlowerInDB(flowerId, companyId, payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Flower updated successfully!',
    data: result,
  });
});

const getSingleFlower = catchAsync(async (req: CustomRequest, res) => {
  const flowerId = req?.params?.flowerId;
  const companyId = req?.user?.company;
  const result = await FlowerService.getSingleFlowerFromDB(
    flowerId, companyId
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Flower retrieved successfully!',
    data: result,
  });
});

const getManyFlower = catchAsync(async (req: CustomRequest, res) => {
  const companyId = req?.user?.company;
  const flowerIds = req?.body?.flowerIds;
  const result = await FlowerService.getManyFlowerFromDB(
    flowerIds, companyId
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Flowers retrieved successfully!',
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

const getBulkFlowers = catchAsync(async (req, res) => {
  console.log(req.body);
  
  const result = await FlowerService.getBulkFlowersFromDB(
    req?.body?.flowerIds,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Flowers retrieved successfully!',
    data: result,
  });
});

export const FlowerController = {
  addFlower,
  deleteFlower,
  updateFlower,
  getSingleFlower,
  getManyFlower,
  getAllFlower,
  bulkDeleteFlower,
  getBulkFlowers
};
