import { JWT_ACCESS_SECRET } from '$env/static/private';
import db from '$lib/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { handlePrismaError } from '$lib/common.js';

export async function create_user(email, password) {
	try {
		const user = await db.user.create({
			data: {
				email,
				password: await bcrypt.hash(password, 12)
			}
		});

		const token = jwt.sign({ id: user.id, email: user.email }, JWT_ACCESS_SECRET, {
			expiresIn: '1d'
		});

		return { token };
	} catch (error) {
		return handlePrismaError({ error, modelName: 'User' });
	}
}

export async function login_user(email, password) {
	try {
		const user = await db.user.findUnique({
			where: {
				email
			}
		});

		if (!user) {
			return { error: 'User not found' };
		}

		const valid = await bcrypt.compare(password, user.password);

		if (!valid) {
			return { error: 'Invalid password' };
		}

		const token = jwt.sign({ id: user.id, email: user.email }, JWT_ACCESS_SECRET, {
			expiresIn: '1d'
		});

		return { token };
	} catch (error) {
		return handlePrismaError({ error, modelName: 'User' });
	}
}

export async function get_user_communities(id) {
	try {
		let communities = await db.user.findUnique({
			where: {
				id
			},
			select: {
				communities: {
					select: {
						name: true
					}
				}
			}
		});
		communities = communities.communities.map((community) => community.name);
		return { communities };
	} catch (error) {
		return handlePrismaError({ error, modelName: 'User' });
	}
}
