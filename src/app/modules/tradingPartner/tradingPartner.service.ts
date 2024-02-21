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

const getSingleTradingPartnerFromDB = async (tradingPartnerId: string) => {
  // check if the TradingPartner is available or not yet
  const result = await TradingPartner.findOne({ code: tradingPartnerId });
  return result;
};

const updateTradingPartnerIntoDB = async (tradingPartnerId: string, payload: Partial<TTradingPartner>) => {
  // check if the TradingPartner is available or not yet
  const result = await TradingPartner.findByIdAndUpdate(tradingPartnerId, payload, {
    new: true,
  });
  return result;
};

export const TradingPartnerServices = {
  addNewTradingPartnerIntoDB,
  getAllTradingPartnerFromDB,
  getSingleTradingPartnerFromDB,
  updateTradingPartnerIntoDB,
};
