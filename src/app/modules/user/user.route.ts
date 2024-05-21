import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

/**
 * 1. Add a User ---> POST /users;
 */

router.post(
  '/',
  validateRequest(UserValidation.createUserValidationSchema),
  auth(USER_ROLE.admin, USER_ROLE.manager),
  UserControllers.createUser,
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.manager, USER_ROLE.seller),
  UserControllers.getAllUser,
);

router.patch(
  '/:id',
  validateRequest(UserValidation.updateUserValidationSchema),
  auth(USER_ROLE.admin, USER_ROLE.manager),
  UserControllers.updateUser,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.manager),
  UserControllers.deleteUser,
);

export const UserRoutes = router;
