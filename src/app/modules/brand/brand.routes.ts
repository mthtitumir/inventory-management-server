import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { BrandValidation } from './brand.validation';
import { USER_ROLE } from '../user/user.constant';
import { BrandControllers } from './brand.controller';

const router = express.Router();

/**
 * 1. Add a brand ---> POST /product-brands;
 * 2. Get all brands
 */

router.post(
  '/',
  validateRequest(BrandValidation.createBrandSchema),
  auth(USER_ROLE.admin, USER_ROLE.manager),
  BrandControllers.createBrand
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.manager, USER_ROLE.moderator),
  BrandControllers.getAllBrands
);

export const BrandRoutes = router;
