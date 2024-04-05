import { db, lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { TimeSpan, createDate } from 'oslo';

import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import mailer from '$lib/shared/modules/mailer';

async function createPasswordResetToken(userId: string): Promise<string> {
	// optionally invalidate all existing tokens
	await db.passwordResetToken.deleteMany({
		where: {
			userId: userId
		}
	});
	const tokenId = generateId(40);

	await db.passwordResetToken.create({
		data: {
			token: tokenId,
			userId: userId,
			expiresAt: createDate(new TimeSpan(2, 'h'))
		}
	});

	return tokenId;
}
export const actions = {
	login: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password');

		if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
			return fail(400, {
				message: 'Invalid password'
			});
		}

		const doesUserExist = await db.user.findFirst({
			where: {
				email
			}
		});
		if (!doesUserExist) {
			return fail(400, {
				message: 'Email already in use'
			});
		}
		const validPassword = await new Argon2id().verify(doesUserExist.hashed_password, password);
		if (!validPassword) {
			return fail(400, {
				message: 'Incorrect username or password'
			});
		}

		const session = await lucia.createSession(doesUserExist.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/protected/dashboard');
	},
	resetPassword: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email') as string;
		if (!email) {
			return fail(400, {
				message: 'Invalid email'
			});
		}
		const doesUserExist = await db.user.findFirst({
			where: {
				email
			}
		});
		if (!doesUserExist) {
			return {
				message: 'Please check your email for a reset link'
			};
		}
		const token = await createPasswordResetToken(doesUserExist.id);
		try {
			await mailer.sendEmail({
				body: `Click here to reset your password: ${process.env.BASE_URL!}/reset-password/${token}`,
				receiver: [email],
				subject: 'Password reset'
			});
			return {
				message: 'Please check your email for a reset link'
			};
		} catch (error) {
			console.error(error);
			return fail(500, {
				message: 'Failed to send email'
			});
		}
	}
};
