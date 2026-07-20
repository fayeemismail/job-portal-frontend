import { z } from 'zod';

export const signUpSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters')
    .trim(),
  email: z.string().email('Please enter a valid email address').trim().toLowerCase(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(128, 'Password must be at most 128 characters'),
  role: z.enum(['customer', 'worker']),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the Terms of Service & Privacy Policy',
  }),
});

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address').trim().toLowerCase(),
  password: z.string().min(1, 'Password is required'),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
