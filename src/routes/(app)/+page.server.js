import { fail } from '@sveltejs/kit';
import { get_posts } from '$lib/models/post/post.model.js';
import { createCommunity } from '$lib/models/community/community.actions.js';
import { deleteVote, createVote } from '$lib/models/vote/vote.actions.js';
import { login, logout, signup } from '$lib/models/user/user.actions.js';

export const load = async ({ locals, url }) => {
	const { error: postError, posts } = await get_posts();

	if (postError) {
		console.log(postError);
		return fail(500, { error: postError });
	}

	return { posts };
};

export const actions = {
	login,
	logout,
	signup,
	createVote,
	deleteVote,
	createCommunity
};
