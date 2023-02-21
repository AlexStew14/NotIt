import { fail, redirect } from '@sveltejs/kit';
import { userSerializer } from '$lib/models/user/user.serializers.js';
import { create_user, login_user } from '$lib/models/user/user.model.js';
import { handleForm } from '$lib/common.js';

const setAuthToken = ({ cookies, token }) => {
	cookies.set('AuthorizationToken', `Bearer ${token}`, {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24,
		path: '/'
	});
};

export const logout = async ({ cookies }) => {
	cookies.delete('AuthorizationToken');
	throw redirect(302, '/');
};

export const login = async ({ cookies, request }) => {
	const { formError, email, password } = await handleForm({ request, serializer: userSerializer });
	if (formError) return formError;

	const { error, token } = await login_user(email, password);

	if (error) {
		return fail(500, { error });
	}

	setAuthToken({ cookies, token });

	return { success: true };
};

export const signup = async ({ cookies, request }) => {
	const { formError, email, password } = await handleForm({ request, serializer: userSerializer });
	if (formError) return formError;

	const { error, token } = await create_user(email, password);

	if (error) {
		console.log({ error });
		return fail(500, { error });
	}

	setAuthToken({ cookies, token });

	return { success: true };
};
