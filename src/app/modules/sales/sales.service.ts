import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Flower } from '../flower/flower.model';
import { TSales } from './sales.interface';
import Sales from './sales.model';

const addNewSalesIntoDB = async (payload: TSales) => {
  const flower = await Flower.isFlowerExists(payload.product);
  if (!flower) {
    throw new AppError(httpStatus.NOT_FOUND, "Flower does't found!");
  }
  if (payload.quantity === flower.quantity) {
    await Flower.findByIdAndDelete(payload.product);
  }
  const result = await Sales.create(payload);
  return result;
};

const getAllSalesFromDB = async () => {};

export const SalesService = {
  addNewSalesIntoDB,
  getAllSalesFromDB,
};
