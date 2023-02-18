import db from '$lib/db.js';

export async function createPost(title, content, authorId) {
	try {
		const post = await db.post.create({
			data: {
				title,
				content,
				authorId
			}
		});
		return { post };
	} catch (error) {
		console.log(error);
		return { error };
	}
}

export async function getPosts() {
	try {
		let posts = await db.post.findMany({
			select: {
				id: true,
				title: true,
				content: true,
				createdAt: true,
				votes: {
					select: {
						value: true
					}
				},
				author: {
					select: {
						id: true,
						email: true
					}
				}
			}
		});

		posts = posts.map((post) => {
			const totalVotes = post.votes.reduce((total, vote) => {
				return total + vote.value;
			}, 0);
			delete post.votes;
			return { ...post, totalVotes };
		});

		return { posts };
	} catch (error) {
		console.log(error);
		return { error };
	}
}

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

export async function deleteVote(postId, userId) {
	try {
		await db.vote.delete({
			where: {
				postId_userId: {
					postId,
					userId
				}
			}
		});

		return { success: true };
	} catch (error) {
		console.log(error);
		return { error };
	}
}
