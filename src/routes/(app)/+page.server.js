import { fail } from '@sveltejs/kit';
import { getPosts } from '$lib/post/post.model.js';
import { postCommunity } from '$lib/community/community.actions.js';
import { deleteVote, postVote } from '$lib/vote/vote.actions.js';
import { login, logout, signup } from '$lib/user/user.actions.js';

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
	login,
	logout,
	signup,
	postVote,
	deleteVote,
	postCommunity
};
