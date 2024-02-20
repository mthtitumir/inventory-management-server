import { z } from 'zod';

const CreateCompanyAddressSchema = z.object({
  country: z.string(),
  provinceOrState: z.string(),
  detailedAddress: z.string(),
  ZIP: z.string(),
});
const UpdateCompanyAddressSchema = z.object({
  country: z.string().optional(),
  provinceOrState: z.string().optional(),
  detailedAddress: z.string().optional(),
  ZIP: z.string().optional(),
});

const CreateCompanyValidationSchema = z.object({
  body: z.object({
    companyData: z.object({
      name: z.string(),
      logo: z.string().optional(),
      isVerified: z.boolean().optional(),
      companyLicenseNumber: z.string(),
      address: CreateCompanyAddressSchema,
      phoneNo: z.string(),
      email: z.string().email(),
    }),
    adminData: z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
      profilePicture: z.string().optional(),
    }),
  }),
});

const UpdateCompanyValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    logo: z.string().optional(),
    isVerified: z.boolean().optional(),
    companyLicenseNumber: z.string().optional(),
    address: UpdateCompanyAddressSchema,
    phoneNo: z.string().optional(),
    email: z.string().email().optional(),
  }),
});

export const CompanyValidations = {
  CreateCompanyValidationSchema,
  UpdateCompanyValidationSchema,
};
