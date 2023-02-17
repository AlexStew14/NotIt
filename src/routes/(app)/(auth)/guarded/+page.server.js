import { redirect, error } from '@sveltejs/kit';

export const load = (event) => {
	const user = event.locals.user;

	if (!user) {
		throw error(401, 'Unauthorized');
	}

	return { user };
};

export const actions = {
	default: async ({ cookies }) => {
		cookies.delete('AuthorizationToken');
		throw redirect(302, '/login');
	}
};
