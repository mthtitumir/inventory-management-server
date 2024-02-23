import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TFlower } from './flower.interface';
import { Flower } from './flower.model';
import { Types } from 'mongoose';

const addFlowerIntoDB = async (
  entryBy: string,
  companyId: string,
  payload: TFlower,
) => {
  const flowerData = { ...payload, entryBy, company: companyId };
  const result = await Flower.create(flowerData);
  return result;
};

const deleteFlowerFromDB = async (
  flowerId: string,
  companyId: Types.ObjectId,
) => {
  // check if the flower exists or not
  const flowerData = await Flower.isFlowerExists(flowerId);
  if (!flowerData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Flower does not exist!');
  }
  // check if the flower belongs to this company
  if (flowerData.company !== companyId) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This flower does not exist in this company!',
    );
  }
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
  const {
    searchTerm = '',
    page = 1,
    limit = 20,
    sortBy,
    sortOrder = 'asc',
  } = query;
  const filter: Record<string, unknown> = {};
  if (query.fragrance) {
    filter.fragrance = query.fragrance;
  }
  if (query.type) {
    filter.type = query.type;
  }
  if (query.size) {
    filter.size = query.size;
  }
  if (query.minPrice || query.maxPrice) {
    filter.price = {
      $gte: parseInt(query.minPrice as string),
      $lte: parseInt(query.maxPrice as string),
    };
  }
  const skip = (Number(page) - 1) * Number(limit);
  const flowerSearchableFields = [
    'name',
    'color',
    'style',
    'arrangement',
    'type',
    'size',
    'fragrance',
  ];
  const searchQuery = Flower.find({
    $or: flowerSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });
  const result = await searchQuery
    .find(filter)
    .sort({ [sortBy as string]: sortOrder === 'asc' ? 1 : -1 })
    .skip(skip)
    .limit(parseInt(limit as string));
  return result;
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
