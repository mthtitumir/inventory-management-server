import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { FlowerRoutes } from '../modules/flower/flower.route';
import { SalesRoutes } from '../modules/sales/sales.route';
import { DiscountRoutes } from '../modules/discount/discount.route';
import { CompanyRoutes } from '../modules/company/company.route';
import { TradingPartnerRoutes } from '../modules/tradingPartner/tradingPartner.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/companies',
    route: CompanyRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/trading-partners',
    route: TradingPartnerRoutes,
  },
  {
    path: '/flowers',
    route: FlowerRoutes,
  },
  {
    path: '/carts',
    route: SalesRoutes,
  },
  {
    path: '/sales',
    route: SalesRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/discounts',
    route: DiscountRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
