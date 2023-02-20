import { fail, redirect } from '@sveltejs/kit';
import { userSerializer } from '$lib/user/user.serializers.js';
import { create_user, login_user } from '$lib/user/user.model.js';

export const logout = async ({ cookies }) => {
	cookies.delete('AuthorizationToken');
	throw redirect(302, '/');
};

export const login = async ({ cookies, request }) => {
	const formData = Object.fromEntries(await request.formData());
	const userData = userSerializer.safeParse(formData);

	if (!userData.success) {
		const errors = userData.error.flatten().fieldErrors;
		return fail(400, { error: errors });
	}

	const { email, password } = userData.data;

	const { error, token } = await login_user(email, password);

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
};

export const signup = async ({ cookies, request }) => {
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
	const { error, token } = await create_user(email, password);

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
};
