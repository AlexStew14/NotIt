import { z } from 'zod';

export const postSerializer = z.object({
	title: z.string().trim().min(1).max(100),
	content: z.string().trim().min(1).max(5000),
	communityName: z.string().trim().min(1).max(21)
});
