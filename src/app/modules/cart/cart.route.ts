import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { CartValidation } from './cart.validation';
import { CartController } from './cart.controller';
const router = express.Router();

/**
 * 1. Add a sales
 * 2. Get all sales data with proper filtering
 * 3. Get Sales history {count, quantity, daily, weekly, monthly}
 */

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.manager, USER_ROLE.seller),
  validateRequest(CartValidation.addToCartSchema),
  CartController.addToCart
);


export const CartRoutes = router;
