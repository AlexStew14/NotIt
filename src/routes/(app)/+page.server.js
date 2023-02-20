import { fail } from '@sveltejs/kit';
import { get_posts } from '$lib/post/post.model.js';
import { createCommunity } from '$lib/community/community.actions.js';
import { deleteVote, createVote } from '$lib/vote/vote.actions.js';
import { login, logout, signup } from '$lib/user/user.actions.js';

export const load = async ({ locals, url }) => {
	const { error: postError, posts } = await get_posts();

	if (postError) {
		console.log(postError);
		return fail(500, { error: postError });
	}

	console.log(posts);
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
