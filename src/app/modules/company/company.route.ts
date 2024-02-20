import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CompanyValidations } from './company.validation';
import { CompanyControllers } from './company.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(CompanyValidations.CreateCompanyValidationSchema),
  CompanyControllers.createCompany,
);

export const CompanyRoutes = router;
