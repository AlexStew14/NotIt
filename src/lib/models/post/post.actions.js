import { fail, redirect } from '@sveltejs/kit';
import { postSerializer } from '$lib/models/post/post.serializers.js';
import { create_post } from '$lib/models/post/post.model.js';
import { handleForm } from '$lib/common.js';

export const createPost = async ({ request, locals }) => {
	const { formError, title, content, communityName } = await handleForm({
		request,
		locals,
		serializer: postSerializer
	});
	if (formError) return formError;

	const { error, post } = await create_post(title, content, locals.user.id, communityName);

	if (error) {
		return fail(500, { error });
	}

	throw redirect(302, `/n/${communityName}/comments/${post.id}`);
};
