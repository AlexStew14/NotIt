import { fail, redirect } from '@sveltejs/kit';
import { get_user_communities } from '$lib/user/user.model.js';

export const load = async ({ locals, url }) => {
	const user = locals.user;

	if (!user) {
		if (url.pathname === '/submit') {
			throw redirect(302, '/');
		}
	}

	if (user) {
		const { error: communityError, communities } = await get_user_communities(locals.user.id);

		if (communityError) {
			console.log(communityError);
			return fail(500, { error: communityError });
		}
		return { user, communities };
	}

	return { user };
};
