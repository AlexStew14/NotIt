import { error } from '@sveltejs/kit';

export const load = ({ locals, url }) => {
	const user = locals.user;
	if (!user) {
		if (url.pathname === '/submit') {
			throw error(401, 'Unauthorized');
		}
	}
	return { user };
};
