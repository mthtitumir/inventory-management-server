import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Company } from '../company/company.model';
import { TTradingPartner } from './tradingPartner.interface';
import { TradingPartner } from './tradingPartner.model';

const addNewTradingPartnerIntoDB = async (payload: TTradingPartner) => {
  const result = await TradingPartner.create(payload);
  return result;
};

const getAllTradingPartnerFromDB = async (query: Record<string, unknown>) => {
  const result = await TradingPartner.find(query);
  return result;
};

const getSingleTradingPartnerFromDB = async (
  companyId: string,
  tradingPartnerId: string,
) => {
  const companyData = await Company.isCompanyExists(companyId);
  const partnerData =
    await TradingPartner.isTradingPartnerExists(tradingPartnerId);
  if (!companyData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Unauthorized staff!');
  } else if (!partnerData) {
    throw new AppError(httpStatus.NOT_FOUND, "This partner doesn't exist!");
  } else {
    const result = await TradingPartner.findById(tradingPartnerId);
    return result;
  }
};

const updateTradingPartnerIntoDB = async (
  companyId: string,
  tradingPartnerId: string,
  payload: Partial<TTradingPartner>,
) => {
  const companyData = await Company.isCompanyExists(companyId);
  const partnerData =
    await TradingPartner.isTradingPartnerExists(tradingPartnerId);
  if (!companyData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Unauthorized staff!');
  } else if (!partnerData) {
    throw new AppError(httpStatus.NOT_FOUND, "This partner doesn't exist!");
  } else {
    const result = await TradingPartner.findByIdAndUpdate(
      tradingPartnerId,
      payload,
      {
        new: true,
      },
    );
    return result;
  }
};

export const TradingPartnerServices = {
  addNewTradingPartnerIntoDB,
  getAllTradingPartnerFromDB,
  getSingleTradingPartnerFromDB,
  updateTradingPartnerIntoDB,
};
