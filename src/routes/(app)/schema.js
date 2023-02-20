import { z } from 'zod';

export const userSchema = z.object({
	email: z.string().email(),
	password: z.string().trim().min(1).max(32)
});