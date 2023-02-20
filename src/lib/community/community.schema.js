import { z } from 'zod';

export const communitySchema = z.object({
	name: z.string().trim().min(1).max(21),
	description: z.string().trim().min(1).max(300)
});
