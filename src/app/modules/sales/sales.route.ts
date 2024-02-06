import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SalesValidation } from './sales.validation';
import { SalesController } from './sales.controller';
const router = express.Router();

/**
 * 1. Add a sales
 * 2. Get all sales data of a user with proper filtering
 * 3. Get Sales history {count, quantity, daily, weekly, monthly}
 */

router.post(
  '/',
  auth(),
  validateRequest(SalesValidation.createSalesSchema),
  SalesController.addNewSales,
);

router.get('/', auth(), SalesController.getAllSales);

router.get('/history', auth(), SalesController.getAllSales);

export const SalesRoutes = router;
