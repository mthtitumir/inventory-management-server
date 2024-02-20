import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Flower } from '../flower/flower.model';
import { TSales } from './sales.interface';
import Sales from './sales.model';
import moment from 'moment';

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
  // need search/ filter query update later
  // range === 'day' | 'week' | 'month' | 'year'
  const { range, from, to } = query;
  let result = await Sales.find().populate('product');
  if (range) {
    const startOfRange = moment()
      .startOf(range)
      .format('YYYY-MM-DDTHH:mm:ss.SSSZ');  
    const endOfRange = moment().endOf(range).format('YYYY-MM-DDTHH:mm:ss.SSSZ');

    result = await Sales.find({
      dateOfSale: { $gte: startOfRange, $lte: endOfRange },
    }).populate('product');
  }

  if (from && to){
    // need to handle only one from or to data further
    // const abc = moment("2024-01-30T09:15:52.154Z").format('YYYY-MM-DDTHH:mm:ss.SSSZ')
    const startOfRange = moment(from).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    const endOfRange = moment(to).format('YYYY-MM-DDTHH:mm:ss.SSSZ');

    result = await Sales.find({
      dateOfSale: { $gte: startOfRange, $lte: endOfRange },
    }).populate('product');
  }
  
  return result;
};

const getSalesHistoryFromDB = async () => {
  // const { salesHistory } = query;
  const salesData = await Sales.find({});
  // switch (salesHistory) {
  //   case 'total':
  //     salesData = await Sales.find({});
  //     break;
  //   case 'daily':
  //     salesData = await getDailySales(salesHistory);
  //     break;
  //   case 'weekly':
  //     salesData = await getWeeklySales(salesHistory);
  //     break;
  //   case 'monthly':
  //     salesData = await getMonthlySales(salesHistory);
  //     break;
  //   case 'yearly':
  //     salesData = await getYearlySales(salesHistory);
  //     break;
  //   // default:
  //   //   salesData = await Sales.find({});
  //   //   return;
  // }

  return salesData;
};

export const SalesService = {
  addNewSalesIntoDB,
  getAllSalesFromDB,
  getSalesHistoryFromDB,
};
