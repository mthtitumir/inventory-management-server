import express from 'express';
import { SeedControllers } from './seed.controller';

const router = express.Router();

router.post(
  '/seed-brand',
  SeedControllers.seedBrand
);
router.post(
  '/seed-products',
  SeedControllers.seedProduct
);

export const SeedRoutes = router;
