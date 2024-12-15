import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { FlowerRoutes } from '../modules/flower/flower.route';
import { SalesRoutes } from '../modules/sales/sales.route';
import { DiscountRoutes } from '../modules/discount/discount.route';
import { CompanyRoutes } from '../modules/company/company.route';
import { TradingPartnerRoutes } from '../modules/tradingPartner/tradingPartner.route';
import { CartRoutes } from '../modules/cart/cart.route';
import { ProductRoutes } from '../modules/product/product.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { SubcategoryRoutes } from '../modules/subcategory/subcategory.routes';
import { BrandRoutes } from '../modules/brand/brand.routes';
import { SeedRoutes } from '../modules/seed/seed.routes';
import { ProductVariantRoutes } from '../modules/productVariant/productVariant.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/companies',
    route: CompanyRoutes,
  },
  {
    path: '/seed',
    route: SeedRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/product-variants',
    route: ProductVariantRoutes,
  },
  {
    path: '/product-categories',
    route: CategoryRoutes,
  },
  {
    path: '/product-subcategories',
    route: SubcategoryRoutes,
  },
  {
    path: '/product-brands',
    route: BrandRoutes,
  },
  {
    path: '/reviews',
    route: BrandRoutes,
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
    route: CartRoutes,
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
