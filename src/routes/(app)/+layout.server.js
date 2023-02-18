import { redirect } from '@sveltejs/kit';

export const load = ({ locals, url }) => {
	const user = locals.user;
	if (!user) {
		if (url.pathname === '/submit') {
			throw redirect(302, '/');
		}
	}
	return { user };
};
