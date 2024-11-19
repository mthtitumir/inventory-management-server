import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { SubcategoryValidation } from './subcategory.validation';
import { USER_ROLE } from '../user/user.constant';
import { SubcategoryControllers } from './subcategory.controller';

const router = express.Router();

/**
 * 1. Add a Subcategory ---> POST /product-subcategories;
 * 2. Get all subcategories ---> GET /product-subcategories;
 */

router.post(
  '/',
  validateRequest(SubcategoryValidation.createSubcategorySchema),
  auth(USER_ROLE.admin, USER_ROLE.manager),
  SubcategoryControllers.createSubcategory
);
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.manager, USER_ROLE.moderator),
  SubcategoryControllers.getAllSubcategories
);

export const SubcategoryRoutes = router;
