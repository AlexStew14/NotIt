import { fail } from '@sveltejs/kit';
import { Prisma } from '@prisma/client';

export const handleForm = async ({ request, locals, serializer }) => {
	if (locals !== undefined && !locals?.user) {
		return { formError: fail(401, { error: 'Unauthorized' }) };
	}

	const formData = Object.fromEntries(await request.formData());
	const data = serializer.safeParse(formData);

	if (!data.success) {
		const errors = data.error.flatten().fieldErrors;
		return { formError: fail(400, { error: errors }) };
	}

	return data.data;
};

export const handlePrismaError = ({ error, modelName }) => {
	if (error instanceof Prisma.PrismaClientKnownRequestError) {
		if (error.code === 'P2002') {
			const targets = error.meta.target;
			const errors = {};
			targets.forEach((target) => {
				errors[target] = [`${modelName} with this ${target} already exists`];
			});
			return { error: errors };
		}
	}
	return { error: 'Something went wrong' };
};
