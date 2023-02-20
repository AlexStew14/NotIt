import db from '$lib/db.js';

export async function create_community(name, description, userId) {
	try {
		const community = await db.community.create({
			data: {
				name,
				description,
				members: {
					connect: {
						id: userId
					}
				}
			}
		});

		return { community };
	} catch (error) {
		if (error?.code === 'P2002') {
			const target = error.meta.target;
			return { error: { [target]: `Community with this ${target} already exists` } };
		}
		return { error };
	}
}

export async function get_community(name) {
	try {
		let community = await db.community.findUnique({
			where: {
				name
			},
			select: {
				name: true,
				description: true,
				posts: {
					select: {
						id: true,
						title: true,
						content: true,
						votes: {
							select: {
								value: true
							}
						},
						author: {
							select: {
								email: true
							}
						}
					}
				},
				_count: {
					select: {
						members: true
					}
				}
			}
		});
		community.memberCount = community._count.members;
		delete community._count;

		community.posts = community.posts.map((post) => {
			const totalVotes = post.votes.reduce((total, vote) => {
				return total + vote.value;
			}, 0);
			delete post.votes;
			return { ...post, totalVotes };
		});

		return { community };
	} catch (error) {
		console.log(error);
		return { error };
	}
}

export async function join_community(name, userId) {
	try {
		await db.community.update({
			where: {
				name
			},
			data: {
				members: {
					connect: {
						id: userId
					}
				}
			}
		});
		return {};
	} catch (error) {
		console.log(error);
		return { error };
	}
}

export async function leave_community(name, userId) {
	try {
		await db.community.update({
			where: {
				name
			},
			data: {
				members: {
					disconnect: {
						id: userId
					}
				}
			}
		});
		return {};
	} catch (error) {
		console.log(error);
		return { error };
	}
}
