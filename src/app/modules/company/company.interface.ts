/* eslint-disable no-unused-vars */
import { Types } from "mongoose";
import { Model } from "mongoose";

export type TCompany = {
  name: string;
  logo?: string;
  isVerified?: boolean;
  companyLicenseNumber: string;
  address: string;
  country: string;
  province?: string;
  city: string;
  zip: string;
  phoneNo: string;
  email: string;
};

export interface CompanyModel extends Model<TCompany> {
  //instance methods for checking if the Company exist
  isCompanyExists(companyId: string | Types.ObjectId): Promise<TCompany>;
}
