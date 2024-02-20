import { Schema, model } from 'mongoose';
import { CompanyModel, TCompany, TCompanyAddress } from './company.interface';

const companyAddressSchema = new Schema<TCompanyAddress>({
  country: { type: String, required: true },
  provinceOrState: { type: String, required: true },
  detailedAddress: { type: String, required: true },
  ZIP: { type: String, required: true },
});

const companySchema = new Schema<TCompany, CompanyModel>({
  name: { type: String, required: true },
  logo: { type: String, default: "https://cdn5.vectorstock.com/i/1000x1000/31/74/company-icon-simple-element-vector-27083174.jpg" },
  isVerified: { type: Boolean, default: false },
  companyLicenseNumber: { type: String, required: true },
  address: { type: companyAddressSchema, required: true },
  phoneNo: { type: String, required: true },
  email: { type: String, required: true },
});

companySchema.statics.isUserExists = async function (
  field: Record<string, unknown>,
) {
  return await Company.findOne(field);
};

export const Company = model<TCompany, CompanyModel>('Company', companySchema);
