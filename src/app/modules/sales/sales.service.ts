/* eslint-disable no-case-declarations */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Flower } from '../flower/flower.model';
import { TSales } from './sales.interface';
import Sales from './sales.model';
import moment from 'moment';
import { Discount } from '../discount/discount.model';
import { TradingPartner } from '../tradingPartner/tradingPartner.model';
import mongoose from 'mongoose';

type RangeType = 'day' | 'week' | 'month' | 'year';

interface QueryParams {
  from?: string;
  to?: string;
  range?: RangeType;
  [key: string]: unknown;
}

const addNewSalesIntoDB = async (
  salesPersonId: string,
  companyId: string,
  payload: TSales,
) => {
  const { items, discount, buyer } = payload;
  const flowerIds = items?.map((item) => item.product);
  await Flower.isFlowersExist(flowerIds);
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // update the flowers
    try {
      for (const { product, quantity } of items) {
        const currentFlower = await Flower.findById(product);
        const newQuantity = (currentFlower?.quantity as number) - quantity;
        // Check if the update will result in a quantity less than 0
        if (newQuantity < 0) {
          throw new AppError(
            httpStatus.BAD_REQUEST,
            `Quantity exceeded, flower ${currentFlower?.name} have ${quantity} in stock`,
          );
        } else if (newQuantity === 0) {
          await Flower.findByIdAndDelete(product, { session });
        } else {
          await Flower.findOneAndUpdate(
            { _id: product },
            { $inc: { quantity: -quantity } },
            { new: true, session },
          );
        }
      }
    } catch (error) {
      throw new AppError(httpStatus.BAD_REQUEST, "Can't update the flower!");
    }
    // update trading partner data
    if (discount) {
      const discountData = await Discount.isDiscountExists(discount);
      if (!discountData) {
        throw new AppError(httpStatus.NOT_FOUND, 'No discount found!');
      }
      await TradingPartner.findByIdAndUpdate(
        buyer,
        { $push: { discountUsed: discount } },
        { new: true, session },
      );
    }
    // add sales
    const result = await Sales.create({
      ...payload,
      salesPerson: salesPersonId,
      company: companyId,
    });
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.CONFLICT, 'Sales add failed!');
  }
};

const updateSalesIntoDB = async () => {};

// const getSingleSalesFromDB = async (
//   buyerId: string,
//   query: Record<string, unknown>,
// ) => {
//   const filter = { buyer: buyerId };
//   console.log(filter);
//   if (query.status) {
//     filter.status = query.status;
//   }

//   const result = await Sales.find(filter);
//   return result;
// };

const getAllSalesFromDB = async (query: QueryParams) => {
  // need search/ filter query update later
  // range === 'day' | 'week' | 'month' | 'year'
  const { range, from, to } = query;
  let result = await Sales.find().sort({ dateOfSale: -1 }).populate("buyer", "_id name");
  if (range) {
    const startOfRange = moment()
      .startOf(range)
      .format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    const endOfRange = moment().endOf(range).format('YYYY-MM-DDTHH:mm:ss.SSSZ');

    result = await Sales.find({
      dateOfSale: { $gte: startOfRange, $lte: endOfRange },
    }).sort({ dateOfSale: -1 }).populate("buyer", "_id name");
  }

  if (from && to) {
    // need to handle only one from or to data further
    // const abc = moment("2024-01-30T09:15:52.154Z").format('YYYY-MM-DDTHH:mm:ss.SSSZ')
    const startOfRange = moment(from).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    const endOfRange = moment(to).format('YYYY-MM-DDTHH:mm:ss.SSSZ');

    result = await Sales.find({
      dateOfSale: { $gte: startOfRange, $lte: endOfRange },
    }).sort({ dateOfSale: -1 }).populate("buyer", "_id name");
  }

  return result;
};

// const getAllSalesFromDB2 = async (query: Record<string, unknown>) => {
//   const { searchTerm = '', status, startDate, endDate, range } = query;
//   const matchCondition = {
//     $and: [
//       {
//         $or: [
//           { 'salesPersonInfo.name': new RegExp(searchTerm, 'i') },
//           { 'buyerInfo.name': new RegExp(searchTerm, 'i') },
//           { 'productInfo.name': new RegExp(searchTerm, 'i') },
//           { note: new RegExp(searchTerm, 'i') },
//         ],
//       },
//       { status: status },
//       // {dateOfSale: ""}
//     ],
//   };

//   if (startDate && endDate) {
//     matchCondition.$and.push({
//       dateOfSale: {
//         $gte: moment(startDate).startOf('day').toDate(),
//         $lte: moment(endDate).endOf('day').toDate(),
//       },
//     });
//   } else {
//     switch (range) {
//       case 'today':
//         matchCondition.$and.push({
//           dateOfSale: {
//             $gte: moment().startOf('day').toDate(),
//             $lte: moment().endOf('day').toDate(),
//           },
//         });
//         break;
//       case 'yesterday':
//         const yesterdayStart = moment()
//           .subtract(1, 'days')
//           .startOf('day')
//           .toDate();
//         const yesterdayEnd = moment().subtract(1, 'days').endOf('day').toDate();
//         matchCondition.$and.push({
//           dateOfSale: { $gte: yesterdayStart, $lte: yesterdayEnd },
//         });
//         break;
//       case 'thisWeek':
//         const startOfWeek = moment().startOf('week').toDate();
//         const endOfWeek = moment().endOf('week').toDate();
//         matchCondition.$and.push({
//           dateOfSale: { $gte: startOfWeek, $lte: endOfWeek },
//         });
//         break;
//       case 'lastWeek':
//         const startOfLastWeek = moment()
//           .subtract(1, 'weeks')
//           .startOf('week')
//           .toDate();
//         const endOfLastWeek = moment()
//           .subtract(1, 'weeks')
//           .endOf('week')
//           .toDate();
//         matchCondition.$and.push({
//           dateOfSale: { $gte: startOfLastWeek, $lte: endOfLastWeek },
//         });
//         break;
//       case 'thisMonth':
//         const startOfMonth = moment().startOf('month').toDate();
//         const endOfMonth = moment().endOf('month').toDate();
//         matchCondition.$and.push({
//           dateOfSale: { $gte: startOfMonth, $lte: endOfMonth },
//         });
//         break;
//       case 'thisYear':
//         const startOfYear = moment().startOf('year').toDate();
//         const endOfYear = moment().endOf('year').toDate();
//         matchCondition.$and.push({
//           dateOfSale: { $gte: startOfYear, $lte: endOfYear },
//         });
//         break;
//       default:
//         break;
//     }
//   }

//   const result = await Sales.aggregate([
//     {
//       $lookup: {
//         from: 'users', // Assuming the collection name for users is 'users'
//         localField: 'salesPerson',
//         foreignField: '_id',
//         as: 'salesPersonInfo',
//       },
//     },
//     {
//       $lookup: {
//         from: 'tradingpartners', // Assuming the collection name for buyers is 'buyers'
//         localField: 'buyer',
//         foreignField: '_id',
//         as: 'buyerInfo',
//       },
//     },
//     {
//       $lookup: {
//         from: 'flowers', // Assuming the collection name for flowers is 'flowers'
//         localField: 'product',
//         foreignField: '_id',
//         as: 'productInfo',
//       },
//     },
//     {
//       $match: matchCondition,
//     },
//   ]);

//   return result;
// };

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
  updateSalesIntoDB,
  // getSingleSalesFromDB,
  getAllSalesFromDB,
  getSalesHistoryFromDB,
  // getAllSalesFromDB2,
};
