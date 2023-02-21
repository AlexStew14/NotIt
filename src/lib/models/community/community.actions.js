import { fail } from '@sveltejs/kit';
import {
	communitySerializer,
	joinCommunitySerializer,
	leaveCommunitySerializer
} from '$lib/models/community/community.serializers.js';
import {
	create_community,
	join_community,
	leave_community
} from '$lib/models/community/community.model.js';
import { handleForm } from '$lib/common.js';

export const createCommunity = async ({ request, locals }) => {
	const { formError, name, description } = await handleForm({
		request,
		locals,
		serializer: communitySerializer
	});
	if (formError) return formError;

	const { error, community } = await create_community(name, description, locals.user.id);

	if (error) {
		return fail(500, { error });
	}

	return { success: true };
};

export const joinCommunity = async ({ request, locals }) => {
	const { formError, name } = await handleForm({
		request,
		locals,
		serializer: joinCommunitySerializer
	});
	if (formError) return formError;

	const { error } = await join_community(name, locals.user.id);

	if (error) {
		return fail(500, { error });
	}

	return { success: true };
};

export const leaveCommunity = async ({ request, locals }) => {
	const { formError, name } = await handleForm({
		request,
		locals,
		serializer: leaveCommunitySerializer
	});
	if (formError) return formError;

	const { error } = await leave_community(name, locals.user.id);

	if (error) {
		return fail(500, { error });
	}

	return { success: true };
};
