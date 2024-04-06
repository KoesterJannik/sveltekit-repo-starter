import { db, lucia } from '$lib/server/auth';
import { fail } from '@sveltejs/kit';
import { TimeSpan, createDate } from 'oslo';

import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import mailer from '$lib/shared/modules/mailer';
import { signinSchema } from './schema.js';
import { z } from 'zod';

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
		// Delay the response by 1 second to simulate a slow network
		await new Promise((resolve) => setTimeout(resolve, 1000));
		const formData = await event.request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password');

		const dataToValidate = {
			...(email.length > 0 && { email }),
			...(password && { password })
		};

		try {
			const validatedData = signinSchema.parse(dataToValidate);

			const user = await db.user.findFirst({
				where: {
					email: validatedData.email
				}
			});

			if (!user) {
				return fail(401, {
					message: 'Incorrect email or password'
				});
			}

			const validPassword = await new Argon2id().verify(
				user.hashed_password,
				validatedData.password
			);

			if (!validPassword) {
				return fail(401, {
					message: 'Incorrect email or password'
				});
			}

			const session = await lucia.createSession(user.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});

			// redirect(302, '/protected/dashboard');
			return {
				user
			};
		} catch (error) {
			if (error instanceof z.ZodError) {
				const errors = error.flatten().fieldErrors;
				return fail(400, {
					errors
				});
			}

			console.error(error);
			return fail(500, {
				message: 'Something went wrong'
			});
		}
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
