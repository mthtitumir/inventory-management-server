import express from 'express';
import { BuyerValidation } from './buyer.validation';
import { BuyerControllers } from './buyer.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.manager, USER_ROLE.admin, USER_ROLE.seller),
  validateRequest(BuyerValidation.CreateBuyerValidationSchema),
  BuyerControllers.addNewBuyer,
);

router.get(
  '/',
  auth(USER_ROLE.manager, USER_ROLE.seller, USER_ROLE.admin),
  BuyerControllers.getAllBuyer,
);

router.get(
  '/:buyerId',
  auth(USER_ROLE.manager, USER_ROLE.seller, USER_ROLE.admin),
  BuyerControllers.getSingleBuyer,
);

router.patch(
  '/:BuyerId',
  auth(USER_ROLE.manager),
  validateRequest(BuyerValidation.UpdateBuyerValidationSchema),
  BuyerControllers.updateBuyer,
);

export const BuyerRoutes = router;
