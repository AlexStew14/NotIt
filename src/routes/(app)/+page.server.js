import { fail, redirect } from '@sveltejs/kit';
import { loginUser } from '$lib/user.model.js';

export const actions = {
	logout: async ({ cookies }) => {
		cookies.delete('AuthorizationToken');
		throw redirect(302, '/');
	}
};
