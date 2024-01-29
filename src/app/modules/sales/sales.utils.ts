/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';
import Sales from './sales.model';

export const getDailySales = async (query: any): Promise<any> => {
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

export const getWeeklySales = async (query: any): Promise<any> => {
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

export const getMonthlySales = async (query: any): Promise<any> => {
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

export const getYearlySales = async (query: any): Promise<any> => {
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

//old manual data//

// /* eslint-disable no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import moment from 'moment';
// import Sales from './sales.model';

// export const getDailySales = async (query: any): Promise<any> => {
//   const startOfDay = moment().startOf('day').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
//   const endOfDay = moment().endOf('day').format('YYYY-MM-DDTHH:mm:ss.SSSZ');

//   return Sales.find({
//     dateOfSale: { $gte: startOfDay, $lte: endOfDay },
//   });
// };

// export const getWeeklySales = async (query: any): Promise<any> => {
//   //   const startOfWeek = moment()
//   //     .startOf('week')
//   //     .format('YYYY-MM-DDTHH:mm:ss.SSSZ');
//   //   const endOfWeek = moment().endOf('week').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
//   const weeklySalesData = await Sales.aggregate([
//     {
//       $group: {
//         _id: { year: { $year: '$dateOfSale' }, week: { $week: '$dateOfSale' } },
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
//         totalQuantity: '$totalQuantity'
//       },
//     },
//   ]);
//   return weeklySalesData;
// };
// // export const getWeeklySales = async (query: any): Promise<any> => {
// //   const startOfWeek = moment().startOf('week').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
// //   const endOfWeek = moment().endOf('week').format('YYYY-MM-DDTHH:mm:ss.SSSZ');

// //   return Sales.find({
// //     dateOfSale: { $gte: startOfWeek, $lte: endOfWeek }
// //   });
// // };

// export const getMonthlySales = async (query: any): Promise<any> => {
//   const startOfMonth = moment()
//     .startOf('month')
//     .format('YYYY-MM-DDTHH:mm:ss.SSSZ');
//   const endOfMonth = moment().endOf('month').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
// const monthlySalesData = await Sales.aggregate([
//     {
//       $group: {
//         _id: { year: { $year: '$dateOfSale' }, month: { $month: '$dateOfSale' } },
//         count: { $sum: 1 },
//         totalQuantity: { $sum: '$quantity' },
//       },
//     },
//     {
//       $sort: { '_id.year': 1, '_id.month': 1 },
//     },
//     {
//       $project: {
//         _id: 0,
//         year: '$_id.year',
//         month: '$_id.month',
//         count: '$count',
//         totalQuantity: '$totalQuantity',
//       },
//     },
//   ]);
//   return monthlySalesData;
// };

// export const getQuarterlySales = async (query: any): Promise<any> => {
//   const startOfQuarter = moment()
//     .startOf('quarter')
//     .format('YYYY-MM-DDTHH:mm:ss.SSSZ');
//   const endOfQuarter = moment()
//     .endOf('quarter')
//     .format('YYYY-MM-DDTHH:mm:ss.SSSZ');

//   return Sales.find({
//     dateOfSale: { $gte: startOfQuarter, $lte: endOfQuarter },
//   });
// };

// export const getYearlySales = async (query: any): Promise<any> => {
//   const startOfYear = moment()
//     .startOf('year')
//     .format('YYYY-MM-DDTHH:mm:ss.SSSZ');
//   const endOfYear = moment().endOf('year').format('YYYY-MM-DDTHH:mm:ss.SSSZ');

//   return Sales.find({
//     dateOfSale: { $gte: startOfYear, $lte: endOfYear },
//   });
// };
