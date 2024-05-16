import express from "express"
import validateRequest from "../../middlewares/validateRequest";
import { FlowerValidation } from "./flower.validation";
import { FlowerController } from "./flower.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
const router = express.Router();

/**
 * 1. Add a flower ---> POST /flowers;
 * 2. Delete a flower ---> DELETE /flowers/:flowerId;
 * 3. Update a flower ---> PATCH /flowers/:flowerId;
 * 4. Get a single flower ---> GET /flowers/:flowerId;
 * 5. Get many flowers ---> GET /flowers/:buyer;
 * 6. Get all flowers depending on filter and searching and sorting query ---> GET /flowers;
 * 7. Bulk delete flowers ---> DELETE /flowers;
 */

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.manager),
  validateRequest(FlowerValidation.createFlowerSchema),
  FlowerController.addFlower,
);

router.delete(
  '/:flowerId',
  auth(USER_ROLE.admin, USER_ROLE.manager),
  FlowerController.deleteFlower,
);

router.patch(
  '/:flowerId',
  auth(USER_ROLE.admin, USER_ROLE.manager),
  validateRequest(FlowerValidation.updateFlowerSchema),
  FlowerController.updateFlower,
);

router.post(
  '/bulk',
  auth(USER_ROLE.admin, USER_ROLE.manager),
  FlowerController.getBulkFlowers,
);

router.get(
  '/:flowerId',
  auth(USER_ROLE.admin, USER_ROLE.manager, USER_ROLE.seller),
  FlowerController.getSingleFlower,
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.manager, USER_ROLE.seller),
  FlowerController.getAllFlower,
);

router.delete(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.manager),
  FlowerController.bulkDeleteFlower,
);


export const FlowerRoutes = router;