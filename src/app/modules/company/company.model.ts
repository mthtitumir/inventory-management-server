import { Schema, model } from 'mongoose';
import { CompanyModel, TCompany } from './company.interface';

const companySchema = new Schema<TCompany, CompanyModel>({
  name: { type: String, required: true },
  logo: { type: String, default: "https://cdn5.vectorstock.com/i/1000x1000/31/74/company-icon-simple-element-vector-27083174.jpg" },
  isVerified: { type: Boolean, default: false },
  companyLicenseNumber: { type: String, required: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  province: { type: String },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  phoneNo: { type: String, required: true },
  email: { type: String, required: true },
});

companySchema.statics.isUserExists = async function (
  field: Record<string, unknown>,
) {
  return await Company.findOne(field);
};

export const Company = model<TCompany, CompanyModel>('Company', companySchema);
