import { fail, redirect } from '@sveltejs/kit';
import { createUser, loginUser } from '$lib/user/user.model.js';
import { getPosts } from '$lib/post/post.model.js';
import { userSchema } from '$lib/user/user.schema.js';
import { createVote, deleteVote } from '$lib/vote/vote.model.js';
import { postCommunity } from '$lib/community/community.actions.js';

export const load = async ({ locals, url }) => {
	const { error: postError, posts } = await getPosts();

	if (postError) {
		console.log(postError);
		return fail(500, { error: postError });
	}

	console.log(posts);
	return { posts };
};

export const actions = {
	logout: async ({ cookies }) => {
		cookies.delete('AuthorizationToken');
		throw redirect(302, '/');
	},
	login: async ({ cookies, request }) => {
		const formData = Object.fromEntries(await request.formData());
		const userData = userSchema.safeParse(formData);

		if (!userData.success) {
			const errors = userData.error.flatten().fieldErrors;
			return fail(400, { error: errors });
		}

		const { email, password } = userData.data;

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
	createVote: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401, { error: 'Unauthorized' });
		}

		const data = Object.fromEntries(await request.formData());
		const { postId, value } = data;

		if (!postId || isNaN(parseInt(value))) {
			return fail(400, { error: 'Missing postId' });
		}

		const { error, vote } = await createVote(postId, locals.user.id, parseInt(value));

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

		const { error } = await deleteVote(postId, locals.user.id);

		if (error) {
			return fail(500, { error });
		}

		return { success: true };
	},
	postCommunity
};
