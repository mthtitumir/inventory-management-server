import AppError from "../../errors/AppError";
import { TCart } from "./cart.interface";
import Cart from "./cart.model";

const addOrUpdateCartIntoDB = async (
    salesPersonId: string,
    companyId: string,
    payload: TCart | Partial<TCart>,
  ) => {
    const { status, buyer, items } = payload;
    if (status !== 'in-cart') {
      throw new AppError(
        httpStatus.BAD_GATEWAY,
        'Wrong API Endpoint, this is for Add To Cart!',
      );
    }
    const cartOfThisBuyer = await Cart.findOne({
      buyer,
      status: 'in-cart',
    });
  
    if (!cartOfThisBuyer) {
      const result = await Sales.create({
        ...payload,
        salesPerson: salesPersonId,
        company: companyId,
      });
      return result;
    }
  
    const updatedItems = cartOfThisBuyer?.items?.map((existingItem) => {
      const matchingItem = items?.find((newItem) =>
        newItem?.product == existingItem?.product,
      );
  
      if (matchingItem) {
        // If the item already exists, update the quantity
        return {
          product: existingItem.product,
          quantity: existingItem.quantity + matchingItem.quantity,
        };
      } else {
        // If the item doesn't exist, keep the existing item
        return existingItem;
      }
    });
    return {updatedItems, note: "update api"};
  
    // Update the existing cart with the updated items
    // await Sales.findByIdAndUpdate(cartOfThisBuyer._id, {
    //   $set: { items: updatedItems },
    // });
  };

  export const CartService = {
    addOrUpdateCartIntoDB,
  }