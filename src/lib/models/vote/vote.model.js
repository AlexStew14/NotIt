import db from '$lib/db.js';
import { handlePrismaError } from '$lib/common.js';

export async function create_vote(postId, userId, value) {
	try {
		const vote = await db.vote.upsert({
			where: {
				postId_userId: {
					postId,
					userId
				}
			},
			update: {
				value
			},
			create: {
				postId,
				userId,
				value
			}
		});

		return { vote };
	} catch (error) {
		return handlePrismaError(error);
	}
}

export async function delete_vote(postId, userId) {
	try {
		await db.vote.delete({
			where: {
				postId_userId: {
					postId,
					userId
				}
			}
		});
		return {};
	} catch (error) {
		return handlePrismaError(error);
	}
}
