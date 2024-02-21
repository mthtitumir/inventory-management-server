import express from 'express';
import { TradingPartnerValidation } from './tradingPartner.validation';
import { TradingPartnerControllers } from './tradingPartner.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.manager, USER_ROLE.admin, USER_ROLE.seller),
  validateRequest(TradingPartnerValidation.CreateTradingPartnerValidationSchema),
  TradingPartnerControllers.addNewTradingPartner,
);

router.get(
  '/',
  auth(USER_ROLE.manager, USER_ROLE.seller, USER_ROLE.admin),
  TradingPartnerControllers.getAllTradingPartner,
);

router.get(
  '/:tradingPartnerId',
  auth(USER_ROLE.manager, USER_ROLE.seller, USER_ROLE.admin),
  TradingPartnerControllers.getSingleTradingPartner,
);

router.patch(
  '/:tradingPartnerId',
  auth(USER_ROLE.manager),
  validateRequest(TradingPartnerValidation.UpdateTradingPartnerValidationSchema),
  TradingPartnerControllers.updateTradingPartner,
);

export const TradingPartnerRoutes = router;
