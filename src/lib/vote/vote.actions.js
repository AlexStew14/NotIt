import { fail } from '@sveltejs/kit';
import { create_vote, delete_vote } from '$lib/vote/vote.model.js';

export const createVote = async ({ request, locals }) => {
	if (!locals.user) {
		return fail(401, { error: 'Unauthorized' });
	}

	const data = Object.fromEntries(await request.formData());
	const { postId, value } = data;

	if (!postId || isNaN(parseInt(value))) {
		return fail(400, { error: 'Missing postId' });
	}

	const { error, vote } = await create_vote(postId, locals.user.id, parseInt(value));

	if (error) {
		return fail(500, { error });
	}

	return { success: true };
};

export const deleteVote = async ({ request, locals }) => {
	if (!locals.user) {
		return fail(401, { error: 'Unauthorized' });
	}

	const data = Object.fromEntries(await request.formData());
	const { postId } = data;

	if (!postId) {
		return fail(400, { error: 'Missing postId' });
	}

	const { error } = await delete_vote(postId, locals.user.id);

	if (error) {
		return fail(500, { error });
	}

	return { success: true };
};
