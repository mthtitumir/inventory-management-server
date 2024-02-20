import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { DiscountValidation } from './discount.validation';
import { DiscountControllers } from './discount.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.manager, USER_ROLE.admin),
  validateRequest(DiscountValidation.CreateDiscountValidationSchema),
  DiscountControllers.addNewDiscount,
);

router.get(
  '/:companyId',
  auth(USER_ROLE.manager, USER_ROLE.seller, USER_ROLE.admin),
  DiscountControllers.getAllDiscount,
);

router.get(
  '/:discountCode',
  auth(USER_ROLE.manager, USER_ROLE.seller, USER_ROLE.admin),
  DiscountControllers.getSingleDiscount,
);

router.patch(
  '/:discountId',
  auth(USER_ROLE.manager),
  validateRequest(DiscountValidation.UpdateDiscountValidationSchema),
  DiscountControllers.updateDiscount,
);

export const DiscountRoutes = router;
