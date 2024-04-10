import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { CartController } from './cart.controller';
const router = express.Router();

/**
 * 1. Add new cart
 */

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.manager, USER_ROLE.seller),
  CartController.addOrUpdateCart,
);

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.manager, USER_ROLE.seller),
  CartController.getSingleBuyerCart,
);



export const CartRoutes = router;
