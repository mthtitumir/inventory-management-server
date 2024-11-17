import { z } from 'zod';

const CreateCompanyValidationSchema = z.object({
  body: z.object({
    companyData: z.object({
      name: z.string().min(1, { message: 'Company name is required.' }).max(255),
      logo: z
        .string()
        .url({ message: 'Logo must be a valid URL.' })
        .optional(),
      companyLicenseNumber: z
        .string()
        .min(1, { message: 'Company license number is required.' })
        .max(255)
        .optional(),
      address: z
        .string()
        .min(1, { message: 'Company address is required.' })
        .max(255),
      country: z
        .string()
        .min(1, { message: 'Country is required.' })
        .max(255),
      province: z
        .string()
        .min(1, { message: 'Province is required.' })
        .max(255)
        .optional(),
      city: z.string().min(1, { message: 'City is required.' }).max(255),
      zip: z.string().min(1, { message: 'Zip code is required.' }).max(20),
      phoneNo: z.string().min(1, { message: 'Phone number is required.' }).max(20),
      email: z.string().email({ message: 'A valid email is required.' }),
    }),
    adminData: z.object({
      username: z
        .string()
        .min(1, { message: 'Admin username is required.' }),
      firstName: z
        .string()
        .min(1, { message: 'Admin first name is required.' }),
      lastName: z
        .string()
        .min(1, { message: 'Admin last name is required.' }),
      email: z
        .string()
        .email({ message: 'Admin email must be valid.' }),
      password: z
        .string()
        .min(1, { message: 'Admin password is required.' }),
      profilePicture: z.string().optional(),
    }),
  }),
});


const UpdateCompanyValidationSchema = z.object({
  body: z.object({
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
});

export const CompanyValidations = {
  CreateCompanyValidationSchema,
  UpdateCompanyValidationSchema,
};
