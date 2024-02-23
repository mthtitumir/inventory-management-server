import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SalesValidation } from './sales.validation';
import { SalesController } from './sales.controller';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();

/**
 * 1. Add a sales
 * 2. Get all sales data with proper filtering
 * 3. Get Sales history {count, quantity, daily, weekly, monthly}
 */

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.manager, USER_ROLE.seller),
  validateRequest(SalesValidation.createSalesSchema),
  SalesController.addNewSales,
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.manager, USER_ROLE.seller),
  SalesController.getAllSales,
);

router.get('/history', auth(), SalesController.getAllSales);

export const SalesRoutes = router;
