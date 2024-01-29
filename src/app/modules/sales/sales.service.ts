import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Flower } from '../flower/flower.model';
import { TSales } from './sales.interface';
import Sales from './sales.model';
import {
  getDailySales,
  getMonthlySales,
  getWeeklySales,
  getYearlySales,
} from './sales.utils';

const addNewSalesIntoDB = async (payload: TSales) => {
  const flower = await Flower.isFlowerExists(payload.product);
  if (!flower) {
    throw new AppError(httpStatus.NOT_FOUND, "Flower does't found!");
  }
  const newQuantity = flower.quantity - payload.quantity;
  if (newQuantity === 0) {
    await Flower.findByIdAndDelete(payload.product);
  } else {
    await Flower.findByIdAndUpdate(payload.product, { quantity: newQuantity });
  }
  const result = await Sales.create(payload);
  return result;
};

const getAllSalesFromDB = async (query: Record<string, unknown>) => {
  const { salesHistory } = query;
  let salesData = await Sales.find({});
  switch (salesHistory) {
    case 'total':
      salesData = await Sales.find({});
      break;
    case 'daily':
      salesData = await getDailySales(salesHistory);
      break;
    case 'weekly':
      salesData = await getWeeklySales(salesHistory);
      break;
    case 'monthly':
      salesData = await getMonthlySales(salesHistory);
      break;
    case 'yearly':
      salesData = await getYearlySales(salesHistory);
      break;
    // default:
    //   salesData = await Sales.find({});
    //   return;
  }
  
  return salesData;
};

export const SalesService = {
  addNewSalesIntoDB,
  getAllSalesFromDB,
};
