import { z } from 'zod';

const createProjectValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string().optional(),
    admin: z.string(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
  }),
});

const updateProjectValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    admin: z.string().optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
  }),
});

export const ProjectValidation = {
  createProjectValidationSchema,
  updateProjectValidationSchema,
};
