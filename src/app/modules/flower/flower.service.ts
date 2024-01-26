import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TFlower } from './flower.interface';
import { Flower } from './flower.model';
import { sendImageToCloudinary } from '../../utils/sendImgToCloudinary';
import { v4 as uuidv4 } from 'uuid';

const addFlowerIntoDB = async (file: any, payload: TFlower) => {
  const uuid = uuidv4();
  const imageName = `/flowers/${uuid}${payload?.name}`;
  const path = file?.path;
  //send image to cloudinary
  const { secure_url } = await sendImageToCloudinary(imageName, path);
  payload.image = secure_url;
  //   const result = await Flower.create(payload);
  return payload;
};

const deleteFlowerFromDB = async (flowerId: string) => {
  // check if the flower exists or not
  const flowerData = await Flower.isFlowerExists(flowerId);
  if (!flowerData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Flower does not exist!');
  }

  //   check if the owner (who added the flower) is deleting it or anyone else
  const result = await Flower.findByIdAndDelete(flowerId);
  return result;
};

const updateFlowerInDB = async (
  flowerId: string,
  payload: Partial<TFlower>,
) => {
  const flowerData = await Flower.isFlowerExists(flowerId);
  if (!flowerData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Flower does not exist!');
  }
  const result = await Flower.findByIdAndUpdate(flowerId, payload, {
    new: true,
  });
  return result;
};

const getSingleFlowerFromDB = async (flowerId: string) => {
  const flowerData = await Flower.isFlowerExists(flowerId);
  if (!flowerData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Flower does not exist!');
  }
  return flowerData;
};

const getAllFlowerFromDB = async (query: Record<string, unknown>) => {
    const {searchTerm = '', page = 1, limit = 10, sortBy, sortOrder = 'asc', } = query;
    const filter: Record<string, unknown> = { };
    const skip = (Number(page) - 1) * Number(limit);
    const flowerSearchableFields = ["color"];
    const searchQuery = Flower.find({
        $or: flowerSearchableFields.map((field) => ({
            [field]: {$regex: searchTerm, $options: "i"}
        }))
    });
    const result = await searchQuery.find(filter).sort({ [sortBy as string]: sortOrder === 'asc' ? 1 : -1 }).skip(skip).limit(parseInt(limit as string));

};

const bulkDeleteFlowerFromDB = async (flowerIdArray: string[]) => {
  const result = await Flower.deleteMany({ _id: { $in: flowerIdArray } });
  return result;
};

export const FlowerService = {
  addFlowerIntoDB,
  deleteFlowerFromDB,
  updateFlowerInDB,
  getSingleFlowerFromDB,
  getAllFlowerFromDB,
  bulkDeleteFlowerFromDB,
};
