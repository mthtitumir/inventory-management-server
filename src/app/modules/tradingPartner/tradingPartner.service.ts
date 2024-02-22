import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Company } from '../company/company.model';
import { TTradingPartner } from './tradingPartner.interface';
import { TradingPartner } from './tradingPartner.model';
import { Discount } from '../discount/discount.model';

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

const updateDiscountCoinsUsedIntoDB = async (
  companyId: string,
  tradingPartnerId: string,
  payload: { discountId: string | undefined; coins: number | undefined },
) => {
  const { discountId, coins } = payload;
  const companyData = await Company.isCompanyExists(companyId);
  const partnerData =
    await TradingPartner.isTradingPartnerExists(tradingPartnerId);
  const discountData = await Discount.isDiscountExists(discountId as string);
  const discountCount = await TradingPartner.aggregate([
    { $unwind: '$discountUsed' },
    {
      $match: {
        discountUsed: discountId,
      },
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ]);
  const discountCountTimes =
    discountCount.length > 0 ? discountCount[0].count : 0;

  if (!companyData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Unauthorized staff!');
  } else if (!partnerData) {
    throw new AppError(httpStatus.NOT_FOUND, "This partner doesn't exist!");
  } else {
    if (!discountId && coins) {
      if ((partnerData?.coinsEarned as number) < coins) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          "Buyer doesn't have enough coins to use!",
        );
      }
      const result = await TradingPartner.findByIdAndUpdate(tradingPartnerId, {
        coinsEarned: (partnerData?.coinsEarned as number) - coins,
      });
      return result;
    } else if (discountId && !coins) {
      if (!discountData) {
        throw new AppError(httpStatus.NOT_FOUND, 'Discount not found!');
      }
      if (discountCountTimes >= (discountData.limitPerCustomer as number)) {
        throw new AppError(httpStatus.NOT_IMPLEMENTED, 'Discount limit exceeded!');
      }
      const result = await TradingPartner.findByIdAndUpdate(
        tradingPartnerId,
        { $push: { discountUsed: discountId } },
        { new: true },
      );
      return result;
    } else {
      if ((partnerData?.coinsEarned as number) < coins!) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          "Buyer doesn't have enough coins to use!",
        );
      }
      if (!discountData) {
        throw new AppError(httpStatus.NOT_FOUND, 'Discount not found!');
      }
      const result = await TradingPartner.findByIdAndUpdate(
        tradingPartnerId,
        {
          $push: { discountUsed: discountId },
          $set: { coinsEarned: (partnerData?.coinsEarned as number) - coins },
        },
        { new: true },
      );
      return result;
    }
  }
};

export const TradingPartnerServices = {
  addNewTradingPartnerIntoDB,
  getAllTradingPartnerFromDB,
  getSingleTradingPartnerFromDB,
  updateTradingPartnerIntoDB,
  updateDiscountCoinsUsedIntoDB,
};
