import { TCart, TItem } from './cart.interface';
import Cart from './cart.model';

const addItemsToCartIntoDB = async (
  salesPerson: string,
  company: string,
  payload: Partial<TCart>,
) => {
  const { buyer, items } = payload;
  const existingCart = await Cart.findOne({buyer});   
  if(!existingCart){
      const result = await Cart.create({...payload, salesPerson, company});
      return result;
  } else {
    // console.log({existingCart});    
    // existingCart.items
    const newCartItems: TItem[] = [];
    items?.map((newItem) => {
        const matchedItem = existingCart?.items?.find(existingItem => existingItem.product == newItem.product);
        if(matchedItem){
            newCartItems.push({product: matchedItem.product, quantity: matchedItem.quantity + newItem.quantity});
        } else {
            newCartItems.push(newItem);
        }
    })
    // existingCart.items?.map((existingItem) => {
    //     console.log({existingItem});
    //     const matchedItem = items?.find(item => item.product == existingItem.product);
    //     if(matchedItem){
    //         newCartItems.push({ product: matchedItem.product, quantity: existingItem.quantity + matchedItem.quantity});
    //     } else {

    //         newCartItems.push(existingItem);
    //     }
    // })
    // console.log({newCartItems});
    await Cart.findOneAndUpdate({buyer}, {$set: {items: newCartItems}});
    return null;
      
  }  
};

export const CartService = {
  addItemsToCartIntoDB,
};
