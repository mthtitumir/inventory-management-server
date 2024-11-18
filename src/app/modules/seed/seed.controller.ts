import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SeedServices } from './seed.service';

const seedBrand = catchAsync(async (req, res) => {
    const result = await SeedServices.seedBrandIntoDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Brand seeded successfully!',
        data: result,
    });
});


export const SeedControllers = {
    seedBrand,
};
