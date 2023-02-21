import { fail } from '@sveltejs/kit';

export const handleForm = async ({ request, locals, serializer }) => {
	if (locals !== undefined && !locals?.user) {
		return { formError: fail(401, { error: 'Unauthorized' }) };
	}

	const formData = Object.fromEntries(await request.formData());
	const data = serializer.safeParse(formData);

	if (!data.success) {
		const errors = data.error.flatten().fieldErrors;
		console.log(errors);
		return { formError: fail(400, { error: errors }) };
	}

	return data.data;
};
