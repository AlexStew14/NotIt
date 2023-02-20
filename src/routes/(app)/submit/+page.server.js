import { fail, redirect } from '@sveltejs/kit';
import { createPost } from '$lib/post/post.model.js';
import { postSchema } from '$lib/post/post.schema.js';

export const actions = {
	createPost: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401, { error: 'Unauthorized' });
		}

		const formData = Object.fromEntries(await request.formData());
		const postData = postSchema.safeParse(formData);

		if (!postData.success) {
			const errors = postData.error.flatten().fieldErrors;
			return fail(400, { error: errors });
		}

		const { title, content, communityName } = postData.data;

		const { error, post } = await createPost(title, content, locals.user.id, communityName);
		if (error) {
			return fail(500, { error });
		}

		throw redirect(302, `/n/${communityName}/comments/${post.id}`);
	}
};
