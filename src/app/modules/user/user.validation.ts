import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
    name: z.string(),
    profilePicture: z.string().optional(),
  })
});
const updateUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email().optional(),
    name: z.string().optional(),
    profilePicture: z.string().optional(),
  })
});

export const UserValidation = {
  createUserValidationSchema,
  updateUserValidationSchema
};