import { get_community } from '$lib/models/community/community.model.js';
import { joinCommunity, leaveCommunity } from '$lib/models/community/community.actions.js';

export const load = async ({ locals, url, params }) => {
	const { name } = params;
	const { error, community } = await get_community(name);
	if (error) {
		return {
			status: 404,
			error: {
				message: 'Community not found'
			}
		};
	}

	return { community };
};

export const actions = {
	joinCommunity,
	leaveCommunity
};
