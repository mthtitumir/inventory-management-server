/* eslint-disable no-case-declarations */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Flower } from '../flower/flower.model';
import { TSales } from './sales.interface';
import Sales from './sales.model';
import moment from 'moment';

const addNewSalesIntoDB = async (salesPersonId: string, companyId: string, payload: TSales) => {
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
  const result = await Sales.create({...payload, salesPerson: salesPersonId, company: companyId});
  return result;
};

const getAllSalesFromDB = async (query: Record<string, unknown>) => {
  // need search/ filter query update later
  // range === 'day' | 'week' | 'month' | 'year'
  // const { range, from, to } = query;
  const {
    searchTerm = '',
    page = 1,
    limit = 20,
    sortBy,
    sortOrder = 'asc',
    range,
    from,
    to,
  } = query;
  const filter: Record<string, unknown> = {};
  console.log(range);
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

  if (from && to) {
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
const getAllSalesFromDB2 = async (query: Record<string, unknown>) => {
  const {
    searchTerm= "",
    status,
    startDate,
    endDate,
    range,
  } = query;
  const matchCondition = {
    $and: [
      {
        $or: [
          { 'salesPersonInfo.name': new RegExp(searchTerm, 'i') },
          { 'buyerInfo.name': new RegExp(searchTerm, 'i') },
          { 'productInfo.name': new RegExp(searchTerm, 'i') },
          { note: new RegExp(searchTerm, 'i') },
        ],
      },
      { status: status },
      // {dateOfSale: ""}
    ],
  };

  if (startDate && endDate) {
    matchCondition.$and.push({ dateOfSale: { $gte: moment(startDate).startOf('day').toDate(), $lte: moment(endDate).endOf('day').toDate() } });
  } else {
    switch (range) {
      case 'today':
        matchCondition.$and.push({ dateOfSale: { $gte: moment().startOf('day').toDate(), $lte: moment().endOf('day').toDate() } });
        break;
      case 'yesterday':
        const yesterdayStart = moment().subtract(1, 'days').startOf('day').toDate();
        const yesterdayEnd = moment().subtract(1, 'days').endOf('day').toDate();
        matchCondition.$and.push({ dateOfSale: { $gte: yesterdayStart, $lte: yesterdayEnd } });
        break;
      case 'thisWeek':
        const startOfWeek = moment().startOf('week').toDate();
        const endOfWeek = moment().endOf('week').toDate();
        matchCondition.$and.push({ dateOfSale: { $gte: startOfWeek, $lte: endOfWeek } });
        break;
      case 'lastWeek':
        const startOfLastWeek = moment().subtract(1, 'weeks').startOf('week').toDate();
        const endOfLastWeek = moment().subtract(1, 'weeks').endOf('week').toDate();
        matchCondition.$and.push({ dateOfSale: { $gte: startOfLastWeek, $lte: endOfLastWeek } });
        break;
      case 'thisMonth':
        const startOfMonth = moment().startOf('month').toDate();
        const endOfMonth = moment().endOf('month').toDate();
        matchCondition.$and.push({ dateOfSale: { $gte: startOfMonth, $lte: endOfMonth } });
        break;
      case 'thisYear':
        const startOfYear = moment().startOf('year').toDate();
        const endOfYear = moment().endOf('year').toDate();
        matchCondition.$and.push({ dateOfSale: { $gte: startOfYear, $lte: endOfYear } });
        break;
      default:
        break;
    }
  }

  const result = await Sales.aggregate([
    {
      $lookup: {
        from: 'users', // Assuming the collection name for users is 'users'
        localField: 'salesPerson',
        foreignField: '_id',
        as: 'salesPersonInfo',
      },
    },
    {
      $lookup: {
        from: 'tradingpartners', // Assuming the collection name for buyers is 'buyers'
        localField: 'buyer',
        foreignField: '_id',
        as: 'buyerInfo',
      },
    },
    {
      $lookup: {
        from: 'flowers', // Assuming the collection name for flowers is 'flowers'
        localField: 'product',
        foreignField: '_id',
        as: 'productInfo',
      },
    },
    {
      $match: matchCondition,
    },
  ]);

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
  getAllSalesFromDB2,
};
