import { fail } from '@sveltejs/kit';
import {
	communitySerializer,
	joinCommunitySerializer,
	leaveCommunitySerializer
} from '$lib/community/community.serializers.js';
import {
	create_community,
	join_community,
	leave_community
} from '$lib/community/community.model.js';

export const createCommunity = async ({ request, locals }) => {
	if (!locals.user) {
		return fail(401, { error: 'Unauthorized' });
	}

	const formData = Object.fromEntries(await request.formData());
	const communityData = communitySerializer.safeParse(formData);

	if (!communityData.success) {
		const errors = communityData.error.flatten().fieldErrors;
		console.log(errors);
		return fail(400, { error: errors });
	}

	const { name, description } = communityData.data;

	const { error, community } = await create_community(name, description, locals.user.id);

	if (error) {
		return fail(500, { error });
	}

	return { success: true };
};

export const joinCommunity = async ({ request, locals }) => {
	if (!locals.user) {
		return fail(401, { error: 'Unauthorized' });
	}

	const formData = Object.fromEntries(await request.formData());
	const communityData = joinCommunitySerializer.safeParse(formData);

	if (!communityData.success) {
		const errors = communityData.error.flatten().fieldErrors;
		console.log(errors);
		return fail(400, { error: errors });
	}

	const { name } = communityData.data;

	const { error } = await join_community(name, locals.user.id);

	if (error) {
		return fail(500, { error });
	}

	return { success: true };
};

export const leaveCommunity = async ({ request, locals }) => {
	if (!locals.user) {
		return fail(401, { error: 'Unauthorized' });
	}

	const formData = Object.fromEntries(await request.formData());
	const communityData = leaveCommunitySerializer.safeParse(formData);

	if (!communityData.success) {
		const errors = communityData.error.flatten().fieldErrors;
		console.log(errors);
		return fail(400, { error: errors });
	}

	const { name } = communityData.data;

	const { error } = await leave_community(name, locals.user.id);

	if (error) {
		return fail(500, { error });
	}

	return { success: true };
};
