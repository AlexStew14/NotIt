import { loginUser } from '$lib/user.model.js';
import { redirect, fail } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/guarded');
	}
};

export const actions = {
	default: async ({ cookies, request }) => {
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

		throw redirect(302, '/guarded');
	}
};
