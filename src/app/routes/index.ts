import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { FlowerRoutes } from '../modules/flower/flower.route';
import { SalesRoutes } from '../modules/sales/sales.route';
import { DiscountRoutes } from '../modules/discount/discount.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/flowers',
    route: FlowerRoutes,
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
