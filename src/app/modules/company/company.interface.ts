/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export type TCompanyAddress = {
  country: string;
  provinceOrState: string;
  detailedAddress: string;
  ZIP: string;
}

export type TCompany = {
  name: string;
  logo?: string;
  isVerified?: boolean;
  companyLicenseNumber: string;
  address: TCompanyAddress;
  phoneNo: string;
  email: string;
};

export interface CompanyModel extends Model<TCompany> {
  //instance methods for checking if the Company exist
  isCompanyExists(field: Record<string, unknown>): Promise<TCompany>;
}
