import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TradingPartnerServices } from './tradingPartner.service';

const addNewTradingPartner = catchAsync(async (req, res) => {
  const result = await TradingPartnerServices.addNewTradingPartnerIntoDB(req?.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'TradingPartner added successfully!',
    data: result,
  });
});

const getAllTradingPartner = catchAsync(async (req, res) => {
    // filter/query must be refactored
  const result = await TradingPartnerServices.getAllTradingPartnerFromDB({...req?.query});

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All TradingPartners retrieved successfully!',
    data: result,
  });
});

const getSingleTradingPartner = catchAsync(async (req, res) => {
  const result = await TradingPartnerServices.getSingleTradingPartnerFromDB(req?.params?.TradingPartnerId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'TradingPartner retrieved successfully!',
    data: result,
  });
});

const updateTradingPartner = catchAsync(async (req, res) => {
  const TradingPartnerId = req?.params?.TradingPartnerId;
  const result = await TradingPartnerServices.updateTradingPartnerIntoDB(
    TradingPartnerId,
    req?.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'TradingPartner updated successfully!',
    data: result,
  });
});

export const TradingPartnerControllers = {
  addNewTradingPartner,
  getAllTradingPartner,
  getSingleTradingPartner,
  updateTradingPartner,
};
