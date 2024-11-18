import express from 'express';
import { SeedControllers } from './seed.controller';

const router = express.Router();

router.post(
  '/seed-brand',
  SeedControllers.seedBrand
);

export const SeedRoutes = router;
