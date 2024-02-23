import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CompanyValidations } from './company.validation';
import { CompanyControllers } from './company.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

/**
 * 1. Register company ---> POST /companies;
 * 2. Get my company ---> GET /companies;
 * 3. Update my company ---> PATCH /companies;
 */

router.post(
  '/',
  validateRequest(CompanyValidations.CreateCompanyValidationSchema),
  CompanyControllers.createCompany,
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.manager, USER_ROLE.seller),
  CompanyControllers.getMyCompany,
);

router.patch(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.manager),
  validateRequest(CompanyValidations.UpdateCompanyValidationSchema),
  CompanyControllers.updateCompany,
);

export const CompanyRoutes = router;
