import { JWT_ACCESS_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';
import db from '$lib/db.js';

export const handle = async ({ event, resolve }) => {
	const authCookie = event.cookies.get('AuthorizationToken');

	if (authCookie) {
		const token = authCookie.split(' ')[1];
		try {
			const jwtUser = jwt.verify(token, JWT_ACCESS_SECRET);
			const user = await db.user.findUnique({
				where: {
					id: jwtUser.id
				}
			});
			if (user) {
				event.locals.user = { id: user.id, email: user.email };
			}
		} catch (error) {
			console.log(error);
		}
	}
	return await resolve(event);
};
