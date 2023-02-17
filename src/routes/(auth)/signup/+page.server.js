import { redirect, fail } from '@sveltejs/kit';
import { createUser } from '$lib/user.model';

export const actions = {
	default: async ({ cookies, request }) => {
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
		const { error } = await createUser(email, password);

		if (error) {
			console.log(error);
			return fail(500, {
				error
			});
		}

		// Redirect to the login page
		throw redirect(302, '/login');
	}
};
