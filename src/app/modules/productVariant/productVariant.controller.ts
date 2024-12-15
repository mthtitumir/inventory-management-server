import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductVariantService } from './productVariant.service';
import { CustomRequest } from '../../middlewares/auth';

const addProductVariant = catchAsync(async (req: CustomRequest, res) => {
    const payload = req.body;
    const result = await ProductVariantService.addProductVariantToDB(payload, req?.user);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Variant added successfully!',
        data: result,
    });
});

const deleteProductVariant = catchAsync(async (req: CustomRequest, res) => {
    const variantId = req.params.variantId;
    const result = await ProductVariantService.deleteProductVariantFromDB(variantId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Variant deleted successfully!',
        data: result,
    });
});

const updateProductVariant = catchAsync(async (req: CustomRequest, res) => {
    const variantId = req.params.variantId;
    const payload = req.body;
    const result = await ProductVariantService.updateProductVariantInDB(variantId, payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Variant updated successfully!',
        data: result,
    });
});

const getSingleProductVariant = catchAsync(async (req: CustomRequest, res) => {
    const variantId = req.params.variantId;
    const result = await ProductVariantService.getSingleProductVariantFromDB(variantId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Variant retrieved successfully!',
        data: result,
    });
});

export const ProductVariantController = {
    addProductVariant,
    deleteProductVariant,
    updateProductVariant,
    getSingleProductVariant,
};
