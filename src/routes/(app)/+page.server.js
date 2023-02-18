import { fail, redirect } from '@sveltejs/kit';
import { createUser, loginUser } from '$lib/user.model.js';

export const actions = {
	logout: async ({ cookies }) => {
		cookies.delete('AuthorizationToken');
		throw redirect(302, '/');
	},
	login: async ({ cookies, request }) => {
		const data = Object.fromEntries(await request.formData());
		const { email, password } = data;

		if (!email || !password) {
			console.log('Missing email or password');
			return { error: 'Missing email or password' };
		}

		const { error, token } = await loginUser(email, password);

		if (error) {
			console.log(error);
			return fail(401, { error });
		}

		cookies.set('AuthorizationToken', `Bearer ${token}`, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24,
			path: '/'
		});

		return { success: true };
	},
	signup: async ({ cookies, request }) => {
		const data = Object.fromEntries(await request.formData());
		const { email, password } = data;

		// Verify that we have an email and a password
		if (!email || !password) {
			console.log('Missing email or password');
			return fail(400, {
				error: 'Missing email or password'
			});
		}

		// Create a new user
		const { error, token } = await createUser(email, password);

		if (error) {
			console.log(error);
			return fail(500, { error });
		}

		cookies.set('AuthorizationToken', `Bearer ${token}`, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24,
			path: '/'
		});

		return { success: true };
	}
};
