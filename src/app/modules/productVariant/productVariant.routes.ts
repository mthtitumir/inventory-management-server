import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ProductVariantValidation } from "./productVariant.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { ProductVariantController } from "./productVariant.controller";

const router = express.Router();

/**
 * 1. Add a product variant ---> POST /product-variants;
 * 1. Get all variants of a product id ---> GET /product-variants; //working
 * 2. Delete a product variant ---> DELETE /product-variants/:variantId;
 * 3. Update a product variant ---> PATCH /product-variants/:variantId;
 * 4. Get a single variant ---> GET /product-variants/:variantId;
 */

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.manager),
  validateRequest(ProductVariantValidation.createProductVariantSchema),
  ProductVariantController.addProductVariant,
);

router.delete(
  '/:variantId',
  auth(USER_ROLE.admin, USER_ROLE.manager),
  ProductVariantController.deleteProductVariant,
);

router.patch(
  '/:variantId',
  auth(USER_ROLE.admin, USER_ROLE.manager),
  validateRequest(ProductVariantValidation.updateProductVariantSchema),
  ProductVariantController.updateProductVariant,
);

router.get(
  '/:variantId',
  auth(USER_ROLE.admin, USER_ROLE.manager, USER_ROLE.moderator),
  ProductVariantController.getSingleProductVariant,
); //working

export const ProductVariantRoutes = router;
