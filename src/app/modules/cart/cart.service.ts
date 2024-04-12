import mongoose from 'mongoose';
import cartItemsSeparator from '../../utils/cartItemsSeparator';
import { TCart } from './cart.interface';
import Cart from './cart.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const addOrUpdateCartIntoDB = async (
  salesPersonId: string,
  companyId: string,
  payload: TCart | Partial<TCart>,
) => {
  const { buyer, items: comingItems } = payload;
  const cartOfThisBuyer = await Cart.findOne({ buyer }).select('items');
  const existingCartItems = cartOfThisBuyer?.items;
  //if there is no cart existed, then create a new cart for this buyer;
  if (!cartOfThisBuyer) {
    const result = await Cart.create({
      ...payload,
      salesPerson: salesPersonId,
      company: companyId,
    });
    return result;
  }
  const { incomingNew, incomingOld } = cartItemsSeparator(
    existingCartItems,
    comingItems,
  );
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // adding incoming new items into the buyers items field
    if (incomingNew && incomingNew.length > 0) {
      await Cart.updateOne(
        {
          buyer,
          company: companyId,
        },
        {
          $push: { items: { $each: incomingNew } },
        },
        {
          new: true,
          session,
        },
      );
    }
    //updating incoming old items into the buyer's items field
    if (incomingOld && incomingOld.length > 0) {
      for (const oldItem of incomingOld) {
        await Cart.updateOne(
          {
            buyer,
            'items.product': oldItem?.product, // Find the item with matching product ID
          },
          {
            $inc: {
              'items.$.quantity': oldItem?.quantity, // Update the quantity of the matched item
            },
          },
          {
            new: true,
            session,
          },
        );
      }
    }
    const result = await Cart.findOne({ buyer, company: companyId });
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    // throw new Error(error);
    // console.log({ error });
    throw new AppError(httpStatus.CONFLICT, 'Cart update failed!');
  }
};

const getSingleBuyerCartFromDB = async (buyerId: string, companyId: string) => {
  const result = await Cart.findOne({
    buyer: buyerId,
    company: companyId,
  }).populate("buyer", "_id name ").populate("items.product", "_id name price quantity");;
  return result;
};

const getAllCartFromDB = async (companyId: string) => {
  const result = await Cart.find({
    company: companyId,
  }).populate("buyer", "_id name ").populate("items.product", "_id name price quantity");
  return result;
};

export const CartService = {
  addOrUpdateCartIntoDB,
  getSingleBuyerCartFromDB,
  getAllCartFromDB,
};
