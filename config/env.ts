import { z } from 'zod';

const envSchema = z.object({
  apiUrl: z.string().url().default('http://localhost:5000/api'),
});

const parsed = envSchema.safeParse({
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
});

if (!parsed.success) {
  console.error('❌ Invalid environment configuration:', parsed.error.format());
  throw new Error('Invalid environment variables configured.');
}

export const ENV = parsed.data;
export default ENV;
