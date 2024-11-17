import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidation } from "./product.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { ProductController } from "./product.controller";

const router = express.Router();

/**
 * 1. Add a product ---> POST /products;
 * 2. Delete a product ---> DELETE /products/:productId;
 * 3. Update a product ---> PATCH /products/:productId;
 * 4. Get a single product ---> GET /products/:productId;
 * 5. Get products by category ---> GET /products/category/:category;
 * 6. Get all products with filtering, searching, and sorting ---> GET /products;
 * 7. Bulk delete products ---> DELETE /products;
 */

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.manager),
  validateRequest(ProductValidation.createProductSchema),
  ProductController.addProduct,
);

router.delete(
  '/:productId',
  auth(USER_ROLE.admin, USER_ROLE.manager),
  ProductController.deleteProduct,
);

router.patch(
  '/:productId',
  auth(USER_ROLE.admin, USER_ROLE.manager),
  validateRequest(ProductValidation.updateProductSchema),
  ProductController.updateProduct,
);

router.get(
  '/:productId',
  auth(USER_ROLE.admin, USER_ROLE.manager, USER_ROLE.moderator),
  ProductController.getSingleProduct,
);

router.get(
  '/category/:category',
  auth(USER_ROLE.admin, USER_ROLE.manager, USER_ROLE.moderator),
  ProductController.getProductsByCategory,
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.manager, USER_ROLE.moderator),
  ProductController.getAllProducts,
);

router.delete(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.manager),
  validateRequest(ProductValidation.deleteManyProductSchema),
  ProductController.bulkDeleteProducts,
);

export const ProductRoutes = router;
