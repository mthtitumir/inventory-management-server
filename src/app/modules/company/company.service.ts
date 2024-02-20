import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TCompany } from './company.interface';
import { Company } from './company.model';

type TCompanyPayload = {
  companyData: Partial<TCompany>;
  adminData: Partial<TUser>;
};

const createCompanyIntoDB = async (payload: TCompanyPayload) => {
  const { companyData, adminData } = payload;
  const newCompany = await Company.create(companyData);
  if(newCompany){
    await User.create({...adminData, company: newCompany?._id, role: "admin"});
  }
  return newCompany;
};

export const CompanyServices = {
  createCompanyIntoDB,
};
