import { fail } from '@sveltejs/kit';
import { communitySerializers } from '$lib/community/community.serializers.js';
import { createCommunity } from '$lib/community/community.model.js';

export const postCommunity = async ({ request, locals }) => {
	if (!locals.user) {
		return fail(401, { error: 'Unauthorized' });
	}

	const formData = Object.fromEntries(await request.formData());
	const communityData = communitySerializers.safeParse(formData);

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
