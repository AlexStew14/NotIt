import { getCommunity } from '$lib/community.model.js';

export const load = async ({ locals, url, params }) => {
	const { name } = params;
	const { error, community } = await getCommunity(name);
};
