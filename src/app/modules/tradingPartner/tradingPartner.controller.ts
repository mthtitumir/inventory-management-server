import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TradingPartnerServices } from './tradingPartner.service';
import { CustomRequest } from '../../middlewares/auth';

const addNewTradingPartner = catchAsync(async (req, res) => {
  const result = await TradingPartnerServices.addNewTradingPartnerIntoDB(req?.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trading Partner added successfully!',
    data: result,
  });
});

const getAllTradingPartner = catchAsync(async (req, res) => {
    // filter/query must be refactored
  const result = await TradingPartnerServices.getAllTradingPartnerFromDB({...req?.query});

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Trading Partners retrieved successfully!',
    data: result,
  });
});

const getSingleTradingPartner = catchAsync(async (req: CustomRequest, res) => {
  const companyId = req?.user?.company;
  const tradingPartnerId = req?.params?.tradingPartnerId;
  const result = await TradingPartnerServices.getSingleTradingPartnerFromDB(companyId, tradingPartnerId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trading Partner retrieved successfully!',
    data: result,
  });
});

const updateTradingPartner = catchAsync(async (req: CustomRequest, res) => {
  const companyId = req?.user?.company;
  const tradingPartnerId = req?.params?.tradingPartnerId;
  const updatedPartnerData = req?.body;
  const result = await TradingPartnerServices.updateTradingPartnerIntoDB(
    companyId,
    tradingPartnerId,
    updatedPartnerData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trading Partner updated successfully!',
    data: result,
  });
});

export const TradingPartnerControllers = {
  addNewTradingPartner,
  getAllTradingPartner,
  getSingleTradingPartner,
  updateTradingPartner,
};
