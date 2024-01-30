/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';
import Sales from './sales.model';
/// will work on this file later

export const getDailySalesHistory = async (query: any): Promise<any> => {
  const dailySalesData = await Sales.aggregate([
    {
      $group: {
        _id: {
          date: { $dateToString: { format: '%Y-%m-%d', date: '$dateOfSale' } },
        },
        count: { $sum: 1 },
        totalQuantity: { $sum: '$quantity' },
      },
    },
    {
      $sort: { '_id.date': 1 },
    },
    {
      $project: {
        _id: 0,
        date: '$_id.date',
        count: '$count',
        totalQuantity: '$totalQuantity',
      },
    },
  ]);
  return dailySalesData;
};

export const getWeeklySalesHistory = async (query: any): Promise<any> => {
  const weeklySalesData = await Sales.aggregate([
    {
      $group: {
        _id: { year: { $year: '$dateOfSale' }, week: { $week: '$dateOfSale' } },
        count: { $sum: 1 },
        totalQuantity: { $sum: '$quantity' },
      },
    },
    {
      $sort: { '_id.year': 1, '_id.week': 1 },
    },
    {
      $project: {
        _id: 0,
        year: '$_id.year',
        week: '$_id.week',
        count: '$count',
        totalQuantity: '$totalQuantity',
      },
    },
  ]);
  return weeklySalesData;
};

export const getMonthlySalesHistory = async (query: any): Promise<any> => {
  const monthlySalesData = await Sales.aggregate([
    {
      $group: {
        _id: {
          year: { $year: '$dateOfSale' },
          month: { $month: '$dateOfSale' },
        },
        count: { $sum: 1 },
        totalQuantity: { $sum: '$quantity' },
      },
    },
    {
      $sort: { '_id.year': 1, '_id.month': 1 },
    },
    {
      $project: {
        _id: 0,
        year: '$_id.year',
        month: '$_id.month',
        count: '$count',
        totalQuantity: '$totalQuantity',
      },
    },
  ]);
  return monthlySalesData;
};

export const getYearlySalesHistory = async (query: any): Promise<any> => {
  const yearlySalesData = await Sales.aggregate([
    {
      $group: {
        _id: { year: { $year: '$dateOfSale' } },
        count: { $sum: 1 },
        totalQuantity: { $sum: '$quantity' },
      },
    },
    {
      $sort: { '_id.year': 1 },
    },
    {
      $project: {
        _id: 0,
        year: '$_id.year',
        count: '$count',
        totalQuantity: '$totalQuantity',
      },
    },
  ]);
  return yearlySalesData;
};

// export const weekWiseSalesData = await Sales.aggregate([
//     {
//       $match: {
//         dateOfSale: {
//           $gte: new Date(startDate),
//           $lt: new Date(endDate),
//         },
//       },
//     },
//     {
//       $group: {
//         _id: {
//           year: { $isoWeekYear: '$dateOfSale' },
//           week: { $isoWeek: '$dateOfSale' },
//         },
//         count: { $sum: 1 },
//         totalQuantity: { $sum: '$quantity' },
//       },
//     },
//     {
//       $sort: { '_id.year': 1, '_id.week': 1 },
//     },
//     {
//       $project: {
//         _id: 0,
//         year: '$_id.year',
//         week: '$_id.week',
//         count: '$count',
//         totalQuantity: '$totalQuantity',
//       },
//     },
//   ]);
