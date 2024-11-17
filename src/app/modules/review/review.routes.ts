import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { ReviewValidation } from './review.validation';
import { ReviewControllers } from './review.controller';

const router = express.Router();

/**
 * 1. Add a review ---> POST /reviews;
 */

router.post(
  '/',
  validateRequest(ReviewValidation.createReviewSchema),
  auth(USER_ROLE.admin, USER_ROLE.manager, USER_ROLE.moderator, USER_ROLE.superAdmin),
  ReviewControllers.createReview
);

export const ReviewRoutes = router;
