import { commentSerializer } from '$lib/models/comment/comment.serializers.js';
import { create_comment } from '$lib/models/comment/comment.model.js';
import { fail } from '@sveltejs/kit';
import { handleForm } from '$lib/common.js';

export const postComment = async ({ request, locals }) => {
	const { formError, content, postId } = await handleForm({
		request,
		locals,
		serializer: commentSerializer
	});
	if (formError) return formError;

	const { error, comment } = await create_comment(content, locals.user.id, postId);

	if (error) {
		return fail(500, { error });
	}

	return { success: true };
};
