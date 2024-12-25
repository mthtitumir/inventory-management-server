/* eslint-disable no-case-declarations */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TOrder } from './order.interface';
import Order from './order.model';
import moment from 'moment';
import mongoose from 'mongoose';
import { ProductVariant } from '../productVariant/productVariant.model';

type RangeType = 'day' | 'week' | 'month' | 'year';

interface QueryParams {
  from?: string;
  to?: string;
  range?: RangeType;
  [key: string]: unknown;
}

const addNewOrderIntoDB = async (
  companyId: string,
  payload: TOrder,
) => {
  const { items, buyerId, salesPersonId } = payload;
  const variantIds = items?.map((item) => item.productVariantId);
  await ProductVariant.isProductVariantsExist(variantIds);
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // update the product variants
    try {
      for (const { productVariantId, quantity } of items) {
        const currentVariant = await ProductVariant.findById(productVariantId);
        const newQuantity = (currentVariant?.quantity as number) - quantity;
        // Check if the update will result in a quantity less than 0
        if (newQuantity < 0) {
          throw new AppError(
            httpStatus.BAD_REQUEST,
            `Quantity exceeded, product variant ${currentVariant?.name} have ${quantity} in stock`,
          );
        } else {
          await ProductVariant.findByIdAndUpdate(
            productVariantId,
            { quantity: newQuantity },
            { new: true, session },
          );
        }
      }
    } catch (error) {
      throw new AppError(httpStatus.BAD_REQUEST, "Can't update the product variant!");
    }
    // update trading partner data
    // if (discount) {
    //   const discountData = await Discount.isDiscountExists(discount);
    //   if (!discountData) {
    //     throw new AppError(httpStatus.NOT_FOUND, 'No discount found!');
    //   }
    //   await TradingPartner.findByIdAndUpdate(
    //     buyer,
    //     { $push: { discountUsed: discount } },
    //     { new: true, session },
    //   );
    // }
    // add sales
    const result = await Order.create({
      ...payload,
      salesPersonId,
      companyId,
      buyerId
    });
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.CONFLICT, 'Order adding failed!');
  }
};

const updateOrderIntoDB = async () => { };

// const getSingleOrderFromDB = async (
//   buyerId: string,
//   query: Record<string, unknown>,
// ) => {
//   const filter = { buyer: buyerId };
//   console.log(filter);
//   if (query.status) {
//     filter.status = query.status;
//   }

//   const result = await Order.find(filter);
//   return result;
// };

const getAllOrderFromDB = async (query: QueryParams) => {
  // need search/ filter query update later
  // range === 'day' | 'week' | 'month' | 'year'
  const { range, from, to } = query;
  let result = await Order.find().sort({ dateOfSale: -1 }).populate("buyer", "_id name");
  if (range) {
    const startOfRange = moment()
      .startOf(range)
      .format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    const endOfRange = moment().endOf(range).format('YYYY-MM-DDTHH:mm:ss.SSSZ');

    result = await Order.find({
      dateOfSale: { $gte: startOfRange, $lte: endOfRange },
    }).sort({ dateOfSale: -1 }).populate("buyer", "_id name");
  }

  if (from && to) {
    // need to handle only one from or to data further
    // const abc = moment("2024-01-30T09:15:52.154Z").format('YYYY-MM-DDTHH:mm:ss.SSSZ')
    const startOfRange = moment(from).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    const endOfRange = moment(to).format('YYYY-MM-DDTHH:mm:ss.SSSZ');

    result = await Order.find({
      dateOfSale: { $gte: startOfRange, $lte: endOfRange },
    }).sort({ dateOfSale: -1 }).populate("buyer", "_id name");
  }

  return result;
};

const getOrderHistoryFromDB = async () => {
  // const { salesHistory } = query;
  const salesData = await Order.find({});
  // switch (salesHistory) {
  //   case 'total':
  //     salesData = await Order.find({});
  //     break;
  //   case 'daily':
  //     salesData = await getDailyOrder(salesHistory);
  //     break;
  //   case 'weekly':
  //     salesData = await getWeeklyOrder(salesHistory);
  //     break;
  //   case 'monthly':
  //     salesData = await getMonthlyOrder(salesHistory);
  //     break;
  //   case 'yearly':
  //     salesData = await getYearlyOrder(salesHistory);
  //     break;
  //   // default:
  //   //   salesData = await Order.find({});
  //   //   return;
  // }

  return salesData;
};

export const OrderService = {
  addNewOrderIntoDB,
  updateOrderIntoDB,
  // getSingleOrderFromDB,
  getAllOrderFromDB,
  getOrderHistoryFromDB,
  // getAllOrderFromDB2,
};
