import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CompanyServices } from './company.service';
import { CustomRequest } from '../../middlewares/auth';

const createCompany = catchAsync(async (req, res) => {
  const result = await CompanyServices.createCompanyIntoDB(req?.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Company created successfully!',
    data: result,
  });
});

const getMyCompany = catchAsync(async (req: CustomRequest, res) => {
  const result = await CompanyServices.getMyCompanyFromDB(req?.user?.companyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Your company data retrieved successfully!',
    data: result,
  });
});

const updateCompany = catchAsync(async (req: CustomRequest, res) => {
  const result = await CompanyServices.updateCompanyIntoDB(req?.user?.companyId, req?.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Company updated successfully!',
    data: result,
  });
});

export const CompanyControllers = {
  createCompany,
  getMyCompany,
  updateCompany
};
