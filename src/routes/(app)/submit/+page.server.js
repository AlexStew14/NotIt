import { fail, redirect } from '@sveltejs/kit';
import { createPost } from '$lib/post.model.js';
import { postSchema } from './schema.js';

export const actions = {
	default: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401, { error: 'Unauthorized' });
		}

		const formData = Object.fromEntries(await request.formData());
		const postData = postSchema.safeParse(formData);

		if (!postData.success) {
			const errors = postData.error.flatten().fieldErrors;
			return fail(400, { error: errors });
		}

		const { title, content } = postData.data;

		const { error, post } = await createPost(title, content, locals.user.id);
		if (error) {
			return fail(500, { error });
		}

		throw redirect(302, '/');
	}
};
