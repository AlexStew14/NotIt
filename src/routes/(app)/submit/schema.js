import { z } from 'zod';

export const postSchema = z.object({
	title: z.string().trim().min(1).max(100),
	content: z.string().trim().min(1).max(1000)
});
