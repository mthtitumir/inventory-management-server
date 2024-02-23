import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { DiscountValidation } from './discount.validation';
import { DiscountControllers } from './discount.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

/**
 * 1. Add a discount ---> POST /discounts;
 * 2. Get all discounts ---> GET /discounts;
 * 3. Get single discounts ---> GET /discounts/:discountId;
 * 4. Update discount ---> PATCH /discounts/:discountId;
 */

router.post(
  '/',
  auth(USER_ROLE.manager, USER_ROLE.admin),
  validateRequest(DiscountValidation.CreateDiscountValidationSchema),
  DiscountControllers.addNewDiscount,
);

router.get(
  '/',
  auth(USER_ROLE.manager, USER_ROLE.seller, USER_ROLE.admin),
  DiscountControllers.getAllDiscount,
);

router.get(
  '/:discountId',
  auth(USER_ROLE.manager, USER_ROLE.seller, USER_ROLE.admin),
  DiscountControllers.getSingleDiscount,
);

router.patch(
  '/:discountId',
  auth(USER_ROLE.admin, USER_ROLE.manager),
  validateRequest(DiscountValidation.UpdateDiscountValidationSchema),
  DiscountControllers.updateDiscount,
);

export const DiscountRoutes = router;
