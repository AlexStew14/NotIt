import { fail, redirect } from '@sveltejs/kit';
import { postSerializer } from '$lib/post/post.serializers.js';
import { create_post } from '$lib/post/post.model.js';

export const createPost = async ({ request, locals }) => {
	if (!locals.user) {
		return fail(401, { error: 'Unauthorized' });
	}

	const formData = Object.fromEntries(await request.formData());
	const postData = postSerializer.safeParse(formData);

	if (!postData.success) {
		const errors = postData.error.flatten().fieldErrors;
		return fail(400, { error: errors });
	}

	const { title, content, communityName } = postData.data;

	const { error, post } = await create_post(title, content, locals.user.id, communityName);
	if (error) {
		return fail(500, { error });
	}

	throw redirect(302, `/n/${communityName}/comments/${post.id}`);
};
