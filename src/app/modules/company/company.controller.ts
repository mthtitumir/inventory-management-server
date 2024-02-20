import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CompanyServices } from './company.service';

const createCompany = catchAsync(async (req, res) => {
  const result = await CompanyServices.createCompanyIntoDB(req?.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Company created successfully!',
    data: result,
  });
});

const getMyCompany = catchAsync(async (req, res) => {
  const result = await CompanyServices.getMyCompanyFromDB(req?.params?.companyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Your company data retrieved successfully!',
    data: result,
  });
});

const updateCompany = catchAsync(async (req, res) => {
  const result = await CompanyServices.updateCompanyIntoDB(req?.params?.companyId, req?.body);

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
