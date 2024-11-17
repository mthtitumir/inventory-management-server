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
    await User.create({...adminData, companyId: newCompany?._id, role: "admin"});
  }
  return newCompany;
};

const getMyCompanyFromDB = async (companyId: string) => {
  const result = await Company.findById(companyId);
  return result;
}

const updateCompanyIntoDB = async (companyId: string, payload: Partial<TCompany>) => {
  const result = await Company.findByIdAndUpdate(companyId, payload, {new: true});
  return result;
}

export const CompanyServices = {
  createCompanyIntoDB,
  getMyCompanyFromDB,
  updateCompanyIntoDB
};
