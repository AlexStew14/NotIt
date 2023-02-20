import { fail } from '@sveltejs/kit';
import { communitySchema } from '$lib/community/community.schema.js';
import { createCommunity } from '$lib/community/community.model.js';

export const postCommunity = async ({ request, locals }) => {
	if (!locals.user) {
		return fail(401, { error: 'Unauthorized' });
	}

	const formData = Object.fromEntries(await request.formData());
	const communityData = communitySchema.safeParse(formData);

	if (!communityData.success) {
		const errors = communityData.error.flatten().fieldErrors;
		console.log(errors);
		return fail(400, { error: errors });
	}

	const { name, description } = communityData.data;

	const { error, community } = await createCommunity(name, description, locals.user.id);

	if (error) {
		return fail(500, { error });
	}

	return { success: true };
};
