import { z } from 'zod';
import { priority, status, type } from './task.constant';

const createTaskSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string().optional(),
    dueDate: z.string().datetime(),
    status: z.enum([...status] as [string, ...string[]]),
    type: z.enum([...type] as [string, ...string[]]).optional(),
    priority: z.enum([...priority] as [string, ...string[]]),
    assignee: z.string(),
    project: z.string().optional(),
  }),
});

const updateTaskSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    dueDate: z.string().datetime().optional(),
    status: z.enum([...status] as [string, ...string[]]).optional(),
    // type: z.enum([...type] as [string, ...string[]]).optional(),
    priority: z.enum([...priority] as [string, ...string[]]).optional(),
    // assignee: z.string().optional(),
    // project: z.string().optional(),
  }),
});

export const TaskValidation = {
  createTaskSchema,
  updateTaskSchema
};
