import { fail, redirect } from '@sveltejs/kit';
import { createUser, loginUser } from '$lib/user.model.js';
import { createPost, getPosts, createVote, deleteVote } from '$lib/post.model.js';

export const load = async ({ locals, url }) => {
	const { error, posts } = await getPosts();

	if (error) {
		console.log(error);
		return fail(500, { error });
	}

	return { posts };
};

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
	},
	createPost: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401, { error: 'Unauthorized' });
		}

		const data = Object.fromEntries(await request.formData());
		const { title, content } = data;

		if (!title || !content) {
			return fail(400, { error: 'Missing title or content' });
		}

		const { error, post } = await createPost(title, content, locals.user.id);

		if (error) {
			return fail(500, { error });
		}

		throw redirect(302, '/');
	},
	createVote: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401, { error: 'Unauthorized' });
		}

		const data = Object.fromEntries(await request.formData());
		const { postId, value } = data;

		if (!postId || isNaN(parseInt(value))) {
			return fail(400, { error: 'Missing postId' });
		}

		const { error, post } = await createVote(postId, locals.user.id, parseInt(value));

		if (error) {
			return fail(500, { error });
		}

		return { success: true };
	},
	deleteVote: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401, { error: 'Unauthorized' });
		}

		const data = Object.fromEntries(await request.formData());
		const { postId } = data;

		if (!postId) {
			return fail(400, { error: 'Missing postId' });
		}

		const { error, post } = await deleteVote(postId, locals.user.id);

		if (error) {
			return fail(500, { error });
		}

		return { success: true };
	}
};
