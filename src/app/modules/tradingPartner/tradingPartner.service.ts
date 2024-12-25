import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Company } from '../company/company.model';
import { TTradingPartner } from './tradingPartner.interface';
import { TradingPartner } from './tradingPartner.model';
import { searchableFields } from './tradingPartner.constant';

const addNewTradingPartnerIntoDB = async (payload: TTradingPartner, companyId: string) => {
  const result = await TradingPartner.create({...payload, partnerOf: companyId });
  return result;
};

const getAllTradingPartnerFromDB = async (
  companyId: string,
  query: Record<string, unknown>,
) => {
  const {
    searchTerm = '',
    page = 1,
    limit = 20,
    sortBy,
    sortOrder = 'asc',
    select = ''
  } = query;
  const filter: Record<string, unknown> = { partnerOf: companyId };
  if (query.type) {
    filter.type = query.type;
  }
  if (query.city) {
    filter.city = query.city;
  }
  if (query.country) {
    filter.country = query.country;
  }
  const skip = (Number(page) - 1) * Number(limit);

  const searchQuery = TradingPartner.find({
    $or: searchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });
  const result = await searchQuery
    .find(filter)
    .select(select as string)
    .sort({ [sortBy as string]: sortOrder === 'asc' ? 1 : -1 })
    .skip(skip)
    .limit(parseInt(limit as string));
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
    const result = await TradingPartner.findById(tradingPartnerId).select("-__v -_id -type");
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
