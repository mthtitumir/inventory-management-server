import express from "express"
import validateRequest from "../../middlewares/validateRequest";
import { FlowerValidation } from "./flower.validation";
import { FlowerController } from "./flower.controller";
import auth from "../../middlewares/auth";
const router = express.Router();

/**
 * 1. Add a flower;
 * 2. Delete a flower;
 * 3. Update a flower;
 * 4. Get a single flower;
 * 5. Get all flowers depending on filter and searching and sorting query;
 * 6. Bulk delete flowers;
 */

router.post(
  '/',
  auth(),
  validateRequest(FlowerValidation.createFlowerSchema),
  FlowerController.addFlower,
);

router.delete(
  '/:flowerId',
  auth(),
  FlowerController.deleteFlower,
);

router.patch(
  '/:flowerId',
  auth(),
  validateRequest(FlowerValidation.updateFlowerSchema),
  FlowerController.updateFlower,
);

router.get(
  '/:flowerId',
  FlowerController.getSingleFlower,
);

router.get(
  '/',
  FlowerController.getAllFlower,
);

router.delete(
  '/',
  auth(),
  FlowerController.bulkDeleteFlower,
);

export const FlowerRoutes = router;