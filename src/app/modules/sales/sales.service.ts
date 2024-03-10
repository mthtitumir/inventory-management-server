/* eslint-disable no-case-declarations */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Flower } from '../flower/flower.model';
import { TSales } from './sales.interface';
import Sales from './sales.model';
import moment from 'moment';

const addNewSalesIntoDB = async (
  salesPersonId: string,
  companyId: string,
  payload: TSales,
) => {
  const { items } = payload;
  const flowerIds = items?.map((item) => item.product);
  await Flower.isFlowersExist(flowerIds);
  if (payload.status === 'in-cart') {
    // Find the existing sales entry with the status "in-cart" for the buyer
    const cartOfThisBuyer = await Sales.findOne({
      buyer: payload.buyer,
      status: 'in-cart',
    });

    if (cartOfThisBuyer) {
      // If an existing cart is found, update its items
      const updatedItems = cartOfThisBuyer?.items?.map((existingItem) => {
        const matchingItem = items.find((newItem) =>
          newItem.product.equals(existingItem.product),
        );

        if (matchingItem) {
          // If the item already exists, update the quantity
          return {
            product: existingItem.product,
            quantity: existingItem.quantity + matchingItem.quantity,
          };
        } else {
          // If the item doesn't exist, keep the existing item
          return existingItem;
        }
      });

      // Update the existing cart with the updated items
      await Sales.findByIdAndUpdate(cartOfThisBuyer._id, {
        $set: { items: updatedItems },
      });

      // Return the updated cart without creating a new sales entry
      return cartOfThisBuyer;
    }
  }
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
        await Flower.findByIdAndDelete(product);
      } else {
        await Flower.findOneAndUpdate(
          { _id: product },
          { $inc: { quantity: -quantity } },
          { new: true },
        );
      }
    }
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, "Can't update the flower!");
  }
  const result = await Sales.create({
    ...payload,
    salesPerson: salesPersonId,
    company: companyId,
  });
  return result;
};

const updateSalesIntoDB = async () => {};

const getSingleSalesFromDB = async (
  buyerId: string,
  query: Record<string, unknown>,
) => {
  const filter = { buyer: buyerId };
  console.log(filter);
  if (query.status) {
    filter.status = query.status;
  }

  const result = await Sales.find(filter);
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
    buyer,
    status,
  } = query;
  const filter: Record<string, unknown> = {};
  if (buyer) {
    filter.buyer = buyer;
  }
  if (status) {
    filter.status = status;
  }
  let result = await Sales.find(filter);
  if (range) {
    const startOfRange = moment()
      .startOf(range)
      .format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    const endOfRange = moment().endOf(range).format('YYYY-MM-DDTHH:mm:ss.SSSZ');

    result = await Sales.find({
      ...filter,
      dateOfSale: { $gte: startOfRange, $lte: endOfRange },
    });
  }

  if (from && to) {
    // need to handle only one from or to data further
    // const abc = moment("2024-01-30T09:15:52.154Z").format('YYYY-MM-DDTHH:mm:ss.SSSZ')
    const startOfRange = moment(from).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    const endOfRange = moment(to).format('YYYY-MM-DDTHH:mm:ss.SSSZ');

    result = await Sales.find({
      ...filter,
      dateOfSale: { $gte: startOfRange, $lte: endOfRange },
    });
  }

  return result;
};

const getAllSalesFromDB2 = async (query: Record<string, unknown>) => {
  const { searchTerm = '', status, startDate, endDate, range } = query;
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
    matchCondition.$and.push({
      dateOfSale: {
        $gte: moment(startDate).startOf('day').toDate(),
        $lte: moment(endDate).endOf('day').toDate(),
      },
    });
  } else {
    switch (range) {
      case 'today':
        matchCondition.$and.push({
          dateOfSale: {
            $gte: moment().startOf('day').toDate(),
            $lte: moment().endOf('day').toDate(),
          },
        });
        break;
      case 'yesterday':
        const yesterdayStart = moment()
          .subtract(1, 'days')
          .startOf('day')
          .toDate();
        const yesterdayEnd = moment().subtract(1, 'days').endOf('day').toDate();
        matchCondition.$and.push({
          dateOfSale: { $gte: yesterdayStart, $lte: yesterdayEnd },
        });
        break;
      case 'thisWeek':
        const startOfWeek = moment().startOf('week').toDate();
        const endOfWeek = moment().endOf('week').toDate();
        matchCondition.$and.push({
          dateOfSale: { $gte: startOfWeek, $lte: endOfWeek },
        });
        break;
      case 'lastWeek':
        const startOfLastWeek = moment()
          .subtract(1, 'weeks')
          .startOf('week')
          .toDate();
        const endOfLastWeek = moment()
          .subtract(1, 'weeks')
          .endOf('week')
          .toDate();
        matchCondition.$and.push({
          dateOfSale: { $gte: startOfLastWeek, $lte: endOfLastWeek },
        });
        break;
      case 'thisMonth':
        const startOfMonth = moment().startOf('month').toDate();
        const endOfMonth = moment().endOf('month').toDate();
        matchCondition.$and.push({
          dateOfSale: { $gte: startOfMonth, $lte: endOfMonth },
        });
        break;
      case 'thisYear':
        const startOfYear = moment().startOf('year').toDate();
        const endOfYear = moment().endOf('year').toDate();
        matchCondition.$and.push({
          dateOfSale: { $gte: startOfYear, $lte: endOfYear },
        });
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

// add to cart services
const addToCartIntoDB = async (
  salesPersonId: string,
  companyId: string,
  payload: Partial<TSales>,
) => {
  const { status, buyer, items } = payload;
  if (status !== 'in-cart') {
    throw new AppError(
      httpStatus.BAD_GATEWAY,
      'Wrong API Endpoint, this is for Add To Cart!',
    );
  }
  const cartOfThisBuyer = await Sales.findOne({
    buyer,
    status: 'in-cart',
  });

  if (!cartOfThisBuyer) {
    const result = await Sales.create({
      ...payload,
      salesPerson: salesPersonId,
      company: companyId,
    });
    return result;
  }

  const updatedItems = cartOfThisBuyer?.items?.map((existingItem) => {
    const matchingItem = items?.find((newItem) =>
      newItem?.product == existingItem?.product,
    );

    if (matchingItem) {
      // If the item already exists, update the quantity
      return {
        product: existingItem.product,
        quantity: existingItem.quantity + matchingItem.quantity,
      };
    } else {
      // If the item doesn't exist, keep the existing item
      return existingItem;
    }
  });
  return {updatedItems, note: "update api"};

  // Update the existing cart with the updated items
  // await Sales.findByIdAndUpdate(cartOfThisBuyer._id, {
  //   $set: { items: updatedItems },
  // });
};

export const SalesService = {
  addNewSalesIntoDB,
  updateSalesIntoDB,
  getSingleSalesFromDB,
  getAllSalesFromDB,
  getSalesHistoryFromDB,
  getAllSalesFromDB2,
  addToCartIntoDB,
};
