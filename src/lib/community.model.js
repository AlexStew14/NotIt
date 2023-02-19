import db from '$lib/db.js';

export async function createCommunity(name, description, userId) {
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

export async function getCommunity(name) {
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
						content: true
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
		console.log(community);
		return community;
	} catch (error) {
		console.log(error);
		return { error };
	}
}
