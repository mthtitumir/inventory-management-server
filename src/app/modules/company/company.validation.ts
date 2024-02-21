import { z } from 'zod';

const CreateCompanyValidationSchema = z.object({
  body: z.object({
    companyData: z.object({
      name: z.string().min(1).max(255),
      logo: z.string().url().optional(),
      isVerified: z.boolean().optional(),
      companyLicenseNumber: z.string().min(1).max(255),
      address: z.string().min(1).max(255),
      country: z.string().min(1).max(255),
      province: z.string().min(1).max(255).optional(),
      city: z.string().min(1).max(255),
      zip: z.string().min(1).max(20),
      phoneNo: z.string().min(1).max(20),
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
    companyData: z.object({
      name: z.string().min(1).max(255).optional(),
      logo: z.string().url().optional(),
      isVerified: z.boolean().optional(),
      companyLicenseNumber: z.string().min(1).max(255).optional(),
      address: z.string().min(1).max(255).optional(),
      country: z.string().min(1).max(255).optional(),
      province: z.string().min(1).max(255).optional(),
      city: z.string().min(1).max(255).optional(),
      zip: z.string().min(1).max(20).optional(),
      phoneNo: z.string().min(1).max(20).optional(),
      email: z.string().email().optional(),
    }),
  }),
});

export const CompanyValidations = {
  CreateCompanyValidationSchema,
  UpdateCompanyValidationSchema,
};
