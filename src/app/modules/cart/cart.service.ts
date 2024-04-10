import { TCart } from './cart.interface';
import Cart from './cart.model';

const addOrUpdateCartIntoDB = async (
  salesPersonId: string,
  companyId: string,
  payload: TCart | Partial<TCart>,
) => {
  const { buyer, items: comingItems } = payload;
  const cartOfThisBuyer = await Cart.findOne({ buyer }).select("items");
  const existingCartItems = cartOfThisBuyer?.items;
  //if there is no cart existed, then create a new cart for this buyer;
  if (!cartOfThisBuyer) {
    const result = await Cart.create({
      ...payload,
      salesPerson: salesPersonId,
      company: companyId,
    });
    return result;
  };
  const newComingItems = [];
  const existingComingItems = [];
  comingItems?.forEach((item) => {
    const index =  existingCartItems?.findIndex((i) => i.product == item.product);
    if (index && index > -1) {
      existingComingItems.push(item);
    } else {
      newComingItems.push(item);
    }
  });
  return {
    newComingItems,
    existingComingItems,
  }

  // new items are two types, 1. already exists, 2. new coming items

//   const updatedItems = cartOfThisBuyer?.items?.map((existingItem) => {
//     const matchingItem = items?.find(
//       (newItem) => newItem?.product == existingItem?.product,
//     );

//     if (matchingItem) {
//       // If the item already exists, update the quantity
//       return {
//         product: existingItem.product,
//         quantity: existingItem.quantity + matchingItem.quantity,
//       };
//     } else {
//       // If the item doesn't exist, keep the existing item
//       return existingItem;
//     }
//   });
//   return { updatedItems, note: 'update api' };

  // Update the existing cart with the updated items
  // await Sales.findByIdAndUpdate(cartOfThisBuyer._id, {
  //   $set: { items: updatedItems },
  // });
};

const getSingleBuyerCartFromDB = async (buyerId: string, companyId: string) => {
  const result = await Cart.findOne({
    buyer: buyerId,
    company: companyId
  });
  return result;
}

const getAllCartFromDB = async (companyId: string) => {
  const result = await Cart.find({
    company: companyId
  });
  return result;
}

export const CartService = {
  addOrUpdateCartIntoDB,
  getSingleBuyerCartFromDB,
  getAllCartFromDB
};
