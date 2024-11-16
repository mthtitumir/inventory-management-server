import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductService } from './product.service';
import { CustomRequest } from '../../middlewares/auth';

const addProduct = catchAsync(async (req: CustomRequest, res) => {
    const payload = req.body;
    const result = await ProductService.addProductToDB(payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Product added successfully!',
        data: result,
    });
});

const deleteProduct = catchAsync(async (req: CustomRequest, res) => {
    const productId = req.params.productId;
    const result = await ProductService.deleteProductFromDB(productId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Product deleted successfully!',
        data: result,
    });
});

const updateProduct = catchAsync(async (req: CustomRequest, res) => {
    const productId = req.params.productId;
    const payload = req.body;
    const result = await ProductService.updateProductInDB(productId, payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Product updated successfully!',
        data: result,
    });
});

const getSingleProduct = catchAsync(async (req: CustomRequest, res) => {
    const productId = req.params.productId;
    const result = await ProductService.getSingleProductFromDB(productId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Product retrieved successfully!',
        data: result,
    });
});

const getProductsByCategory = catchAsync(async (req: CustomRequest, res) => {
    const category = req.params.category;
    const result = await ProductService.getProductsByCategoryFromDB(category);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Products by category retrieved successfully!',
        data: result,
    });
});

const getAllProducts = catchAsync(async (req, res) => {
    const result = await ProductService.getAllProductsFromDB(req.query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'All products retrieved successfully!',
        data: result,
    });
});

const bulkDeleteProducts = catchAsync(async (req, res) => {
    const productIdArray = req.body.productIdArray;
    const result = await ProductService.bulkDeleteProductsFromDB(productIdArray);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Products deleted successfully!',
        data: result,
    });
});

const getBulkProducts = catchAsync(async (req, res) => {
    const productIds = req.body.productIds;
    const result = await ProductService.getBulkProductsFromDB(productIds);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Bulk products retrieved successfully!',
        data: result,
    });
});

export const ProductController = {
    addProduct,
    deleteProduct,
    updateProduct,
    getSingleProduct,
    getProductsByCategory,
    getAllProducts,
    bulkDeleteProducts,
    getBulkProducts,
};
