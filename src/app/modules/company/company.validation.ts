import { z } from 'zod';

const CompanyAddressSchema = z.object({
  country: z.string(),
  provinceOrState: z.string(),
  address: z.string(),
  ZIP: z.string(),
});

const CreateCompanyValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    logo: z.string().optional(),
    isVerified: z.boolean().optional(),
    companyLicenseNumber: z.string(),
    address: CompanyAddressSchema,
    phoneNo: z.string(),
    email: z.string().email()
  })
});

const UpdateCompanyValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    logo: z.string().optional(),
    isVerified: z.boolean().optional(),
    companyLicenseNumber: z.string().optional(),
    address: CompanyAddressSchema.optional(),
    phoneNo: z.string().optional(),
    email: z.string().email().optional()
  })
});

export const CompanyValidations = {
  CreateCompanyValidationSchema,
  UpdateCompanyValidationSchema
};
