import { getPost } from '$lib/post/post.model.js';

export const load = async ({ locals, url, params }) => {
	const { postId } = params;
	const { error, post } = await getPost(postId);
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
