import {z} from 'zod';

export const requestAccessSchema = z.object({
    fullName: z
        .string()
        .min(1, 'Full name is required')
        .min(2, 'Full name must be at least 2 characters'),
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email address'),
    organization: z
        .string()
        .min(1, 'Organization is required'),
    message: z
        .string()
        .min(1, 'Message is required')
        .min(10, 'Please provide more detail'),
});

export type RequestAccessSchema = z.infer<typeof requestAccessSchema>;