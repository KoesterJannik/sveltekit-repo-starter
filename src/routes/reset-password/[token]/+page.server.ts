import { redirect } from '@sveltejs/kit';
import { db, lucia } from '../../../lib/server/auth';
import type { PageServerLoad } from './$types';
import { Argon2id } from 'oslo/password';
export const load = (async ({ params }) => {
	const token = await db.passwordResetToken.findFirst({
		where: {
			token: params.token
		}
	});
	const expirationDate = new Date(token!.expiresAt);
	if (expirationDate < new Date()) {
		redirect(303, '/signin');
	}
	return {
		token: params.token
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const password = formData.get('password') as string;
		const providedToken = formData.get('token') as string;
		// always hash the password to prevent timing attacks
		const hashedPassword = await new Argon2id().hash(password);
		const token = await db.passwordResetToken.findFirst({
			where: {
				token: providedToken
			}
		});
		const expirationDate = new Date(token!.expiresAt);
		if (expirationDate < new Date()) {
			redirect(302, '/signin');
		}

		const user = await db.user.update({
			where: {
				id: token!.userId
			},
			data: {
				hashed_password: hashedPassword
			}
		});
		await db.passwordResetToken.deleteMany({
			where: {
				userId: user.id
			}
		});
		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/protected/dashboard');
	}
};
