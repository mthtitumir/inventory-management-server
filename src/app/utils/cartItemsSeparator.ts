import { TItem } from '../modules/sales/sales.interface';

const cartItemsSeparator = (
  existingItems: TItem[] | undefined,
  incomingItems: TItem[] | undefined,
) => {
  const incomingNew: TItem[] = []; // completely new items, we have to add this items in the buyer's items array
  const incomingOld: TItem[] = []; // already in cart, we have to just update this items
  incomingItems?.map((ii) => {
    const matchingItem = existingItems?.find((ei) => ei.product == ii.product);
    if (matchingItem) {
      incomingOld.push(ii);
    } else {
      incomingNew.push(ii);
    }
  });
  return { incomingNew, incomingOld };
};

export default cartItemsSeparator;
