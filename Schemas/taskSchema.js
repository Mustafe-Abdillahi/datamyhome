import {z}from 'zod';
export const TaskSchema=z.object({
    title:z.string().min(1,'title is required'),
    description:z.string().optional(),
    status:z.enum(['pending','in progress','completed']
    ).optional(),
    dueDate:z.string().optional()
})