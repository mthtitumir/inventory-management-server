import { TBuyer } from './buyer.interface';
import { Buyer } from './buyer.model';

const addNewBuyerIntoDB = async (payload: TBuyer) => {
  const result = await Buyer.create(payload);
  return result;
};

const getAllBuyerFromDB = async (query: Record<string, unknown>) => {
  const result = await Buyer.find(query);
  return result;
};

const getSingleBuyerFromDB = async (buyerId: string) => {
  // check if the Buyer is available or not yet
  const result = await Buyer.findOne({ code: buyerId });
  return result;
};

const updateBuyerIntoDB = async (buyerId: string, payload: Partial<TBuyer>) => {
  // check if the Buyer is available or not yet
  const result = await Buyer.findByIdAndUpdate(buyerId, payload, {
    new: true,
  });
  return result;
};

export const BuyerServices = {
  addNewBuyerIntoDB,
  getAllBuyerFromDB,
  getSingleBuyerFromDB,
  updateBuyerIntoDB,
};
