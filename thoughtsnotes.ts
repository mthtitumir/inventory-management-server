/**
 * products: [
 *  {
 *      product: _id,
 *      quantity: 5,
 *      size: l,
 *      color:
 * }
 * ]
 */

/**
 * if the item just added into cart, it doesn't need to minus the quantity from the flower as the order doesn't completed yet.
 *
 */

/**
 * no extra cart system
 * once a product is added into sales, it won't be added again, just increase the quantity
 */

const existingArray = [
  {
    itemId: 1,
    amount: 10,
  },
  {
    itemId: 2,
    amount: 10,
  },
  {
    itemId: 3,
    amount: 10,
  },
  {
    itemId: 4,
    amount: 10,
  },
];

const newMatchingArray = [
  {
    itemId: 2,
    amount: 20,
  },
  {
    itemId: 3,
    amount: 20,
  },
];
const mergeArrays = (arr1, arr2) => {
  arr2.forEach((item) => {
    const index = arr1.findIndex((i) => i.itemId === item.itemId);
    if (index > -1) {
      arr1[index].amount = arr1[index].amount + item.amount;
    } else {
      arr1.push(item);
    }
  });
  return arr1;
};
const mergeArrayss = (arr1, arr2) => {
    for (let newItem of arr2) {
      let found = false;
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].itemId === newItem.itemId) {
          arr1[i].amount += newItem.amount;
          found = true;
          break;
        }
      }
      if (!found) {
        arr1.push(newItem);
      }
    }
    return arr1;
  };
