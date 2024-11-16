import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

/**
 * 1. Add a User ---> POST /users;
 * 2. Get all users of a company ---> GET /users;
 */

router.post(
  '/',
  validateRequest(UserValidation.createUserValidationSchema),
  auth(USER_ROLE.admin, USER_ROLE.manager),
  UserControllers.createUser,
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.manager, USER_ROLE.moderator),
  UserControllers.getAllUser,
);

router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.manager, USER_ROLE.moderator, USER_ROLE.superAdmin),
  UserControllers.getMe,
);

router.patch(
  '/update-me',
  validateRequest(UserValidation.updateUserValidationSchema),
  auth(USER_ROLE.admin, USER_ROLE.manager, USER_ROLE.moderator, USER_ROLE.superAdmin),
  UserControllers.updateUser,
);

router.patch(
  '/update-company-member/:id',
  validateRequest(UserValidation.updateUserAccessSchema),
  auth(USER_ROLE.admin),
  UserControllers.updateUserAccess,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.manager),
  UserControllers.deleteUser,
);

export const UserRoutes = router;
