import { fail } from '@sveltejs/kit';
import { create_vote, delete_vote } from '$lib/models/vote/vote.model.js';
import { handleForm } from '$lib/common.js';
import { createVoteSerializer, deleteVoteSerializer } from '$lib/models/vote/vote.serializers.js';

export const createVote = async ({ request, locals }) => {
	const { formError, postId, value } = await handleForm({
		request,
		locals,
		serializer: createVoteSerializer
	});
	if (formError) return formError;

	const { error, vote } = await create_vote(postId, locals.user.id, parseInt(value));

	if (error) {
		return fail(500, { error });
	}

	return { success: true };
};

export const deleteVote = async ({ request, locals }) => {
	const { formError, postId } = await handleForm({
		request,
		locals,
		serializer: deleteVoteSerializer
	});
	if (formError) return formError;

	const { error } = await delete_vote(postId, locals.user.id);

	if (error) {
		return fail(500, { error });
	}

	return { success: true };
};
