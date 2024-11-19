import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SubcategoryServices } from './subcategory.service';

const createSubcategory = catchAsync(async (req, res) => {
    const result = await SubcategoryServices.createSubcategoryIntoDB(req?.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Subcategory created successfully!',
        data: result,
    });
});
const getAllSubcategories = catchAsync(async (req, res) => {
    const result = await SubcategoryServices.getAllSubcategoriesFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Subcategories retrieved successfully!',
        data: result,
    });
});


export const SubcategoryControllers = {
    createSubcategory,
    getAllSubcategories
};
