import { z } from 'zod';

export const commentSerializer = z.object({
	content: z.string().trim().min(1).max(5000),
	postId: z.string()
});
