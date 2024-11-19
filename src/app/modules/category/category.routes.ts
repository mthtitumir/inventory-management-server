import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { CategoryValidation } from './category.validation';
import { USER_ROLE } from '../user/user.constant';
import { CategoryControllers } from './category.controller';

const router = express.Router();

/**
 * 1. Add a Category ---> POST /product-categories;
 * 2. Get all categories ---> GET product-categories;
 */

router.post(
  '/',
  validateRequest(CategoryValidation.createCategorySchema),
  auth(USER_ROLE.admin, USER_ROLE.manager),
  CategoryControllers.createCategory
);
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.manager, USER_ROLE.moderator),
  CategoryControllers.getAllCategories
);

export const CategoryRoutes = router;
