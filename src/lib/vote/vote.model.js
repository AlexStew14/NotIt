import db from '$lib/db.js';

export async function createVote(postId, userId, value) {
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
		console.log(error);
		return { error };
	}
}

export async function removeVote(postId, userId) {
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
		console.log(error);
		return { error };
	}
}
