import { z } from 'zod';

export const communitySerializers = z.object({
	name: z.string().trim().min(1).max(21),
	description: z.string().trim().min(1).max(300)
});
