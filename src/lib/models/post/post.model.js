import db from '$lib/db.js';
import { handlePrismaError } from '$lib/common.js';

export async function create_post(title, content, authorId, communityName) {
	try {
		const post = await db.post.create({
			data: {
				title,
				content,
				authorId,
				communityName
			}
		});
		return { post };
	} catch (error) {
		return handlePrismaError({ error, modelName: 'Post' });
	}
}

export async function get_posts() {
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
				},
				communityName: true
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
		return handlePrismaError({ error, modelName: 'Post' });
	}
}

export async function get_post(id) {
	try {
		let post = await db.post.findUnique({
			where: {
				id
			},
			select: {
				id: true,
				title: true,
				content: true,
				createdAt: true,
				author: {
					select: {
						email: true
					}
				},
				communityName: true,
				votes: {
					select: {
						value: true
					}
				},
				comments: {
					select: {
						id: true,
						content: true,
						createdAt: true,
						author: {
							select: {
								email: true
							}
						}
					}
				}
			}
		});
		const totalVotes = post.votes.reduce((total, vote) => {
			return total + vote.value;
		}, 0);
		delete post.votes;
		post = { ...post, totalVotes };

		return { post };
	} catch (error) {
		return handlePrismaError({ error, modelName: 'Post' });
	}
}
