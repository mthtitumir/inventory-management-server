import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidation } from './order.validation';
import { OrderController } from './order.controller';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();

/**
 * 1. Add a sales
 * 2. Get all sales data with proper filtering
 * 3. Get Order history {count, quantity, daily, weekly, monthly}
 */

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.manager, USER_ROLE.moderator),
  validateRequest(OrderValidation.createOrderSchema),
  OrderController.addNewOrder,
);

// router.get(
//   '/:buyerId',
//   auth(USER_ROLE.admin, USER_ROLE.manager),
//   OrderController.getSingleOrder,
// );

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.manager),
  OrderController.getAllOrder,
);

router.get('/history', auth(), OrderController.getAllOrder);


export const OrderRoutes = router;
