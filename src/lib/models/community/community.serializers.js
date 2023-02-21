import { z } from 'zod';

export const communitySerializer = z.object({
	name: z.string().trim().min(1).max(21),
	description: z.string().trim().min(1).max(300)
});

export const joinCommunitySerializer = z.object({
	name: z.string().trim().min(1).max(21)
});

export const leaveCommunitySerializer = z.object({
	name: z.string().trim().min(1).max(21)
});
