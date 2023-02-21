import db from '$lib/db.js';
import { handlePrismaError } from '$lib/common.js';

export const create_comment = async (content, authorId, postId) => {
	try {
		return await db.comment.create({
			data: {
				content,
				authorId,
				postId
			}
		});
	} catch (error) {
		return handlePrismaError(error);
	}
};
