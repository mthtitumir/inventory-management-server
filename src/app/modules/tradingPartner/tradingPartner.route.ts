import express from 'express';
import { TradingPartnerValidation } from './tradingPartner.validation';
import { TradingPartnerControllers } from './tradingPartner.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

/**
 * 1. Add new partner ---> POST /trading-partners;
 * 2. Get all partners ---> GET /trading-partners;
 * 3. Get single partner ---> GET /trading-partners/:tradingPartnerId;
 * 4. Update a partner ---> PATCH /trading-partners/:tradingPartnerId;
*/

router.post(
  '/',
  auth(USER_ROLE.manager, USER_ROLE.admin),
  validateRequest(TradingPartnerValidation.CreateTradingPartnerValidationSchema),
  TradingPartnerControllers.addNewTradingPartner,
);

router.get(
  '/',
  auth(USER_ROLE.manager, USER_ROLE.admin),
  TradingPartnerControllers.getAllTradingPartner,
);

router.get(
  '/:tradingPartnerId',
  auth(USER_ROLE.manager, USER_ROLE.admin),
  TradingPartnerControllers.getSingleTradingPartner,
);

router.patch(
  '/:tradingPartnerId',
  auth(USER_ROLE.manager, USER_ROLE.admin),
  validateRequest(TradingPartnerValidation.UpdateTradingPartnerValidationSchema),
  TradingPartnerControllers.updateTradingPartner,
);

export const TradingPartnerRoutes = router;
