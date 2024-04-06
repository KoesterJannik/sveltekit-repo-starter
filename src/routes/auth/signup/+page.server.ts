import { db, lucia } from '$lib/server/auth';
import { fail } from '@sveltejs/kit';

import { Argon2id } from 'oslo/password';
import { z } from 'zod';
import { signupSchema } from './schema';

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const confirmPassword = formData.get('confirmPassword') as string;

		const dataToValidate = {
			...(email.length > 0 && { email }),
			...(password.length > 0 && { password }),
			...(confirmPassword.length > 0 && { confirmPassword })
		};

		try {
			const validatedData = signupSchema.parse(dataToValidate);

			const hashedPassword = await new Argon2id().hash(validatedData.password);

			const doesUserExist = await db.user.findFirst({
				where: {
					email: validatedData.email
				}
			});

			if (doesUserExist) {
				return fail(400, {
					errors: {
						email: 'Email is already in use'
					}
				});
			}

			const newUser = await db.user.create({
				data: {
					email,
					hashed_password: hashedPassword
				}
			});

			const session = await lucia.createSession(newUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});

			return {
				user: newUser
			};
		} catch (error) {
			if (error instanceof z.ZodError) {
				const errors = error.flatten().fieldErrors;

				return fail(400, {
					errors
				});
			}

			return fail(500, {
				message: 'An unexpected error occurred. Please try again later.'
			});
		}
	}
};
