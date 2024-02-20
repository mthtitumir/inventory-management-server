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

export const CompanyControllers = {
  createCompany,
};
