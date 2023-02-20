import { get_post } from '$lib/post/post.model.js';
import { postComment } from '$lib/comment/comment.actions.js';

export const load = async ({ locals, url, params }) => {
	const { postId } = params;
	const { error, post } = await get_post(postId);
	if (error) {
		return {
			status: 404,
			error: {
				message: 'Post not found'
			}
		};
	}
	return { post };
};

export const actions = {
	postComment
};
