import { commentSerializer } from '$lib/comment/comment.serializers.js';
import { create_comment } from '$lib/comment/comment.model.js';
import { fail } from '@sveltejs/kit';

export const postComment = async ({ request, locals }) => {
	if (!locals.user) {
		return fail(401, { error: 'Unauthorized' });
	}

	const formData = Object.fromEntries(await request.formData());
	const commentData = commentSerializer.safeParse(formData);

	if (!commentData.success) {
		const errors = commentData.error.flatten().fieldErrors;
		return fail(400, { error: errors });
	}

	const { content, postId } = commentData.data;

	const { error, comment } = await create_comment(content, locals.user.id, postId);

	if (error) {
		return fail(500, { error });
	}

	return { success: true };
};
