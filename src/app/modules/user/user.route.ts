import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

/**
 * 1. Add a User ---> POST /users;
 */

router.post(
  '/',
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.createUser,
);

export const UserRoutes = router;
