import { z } from 'zod';

export const createVoteSerializer = z.object({
	value: z.coerce.number().int().min(-1).max(1),
	postId: z.string()
});

export const deleteVoteSerializer = z.object({
	value: z.coerce.number().int().min(-1).max(1),
	postId: z.string()
});
