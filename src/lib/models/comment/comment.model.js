import db from '$lib/db.js';

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
		console.log(error);
		return { error };
	}
};
