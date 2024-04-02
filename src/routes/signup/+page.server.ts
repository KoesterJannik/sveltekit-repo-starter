import { db, lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';

import { Argon2id } from 'oslo/password';

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password');
		console.log('email', email);
		console.log('password', password);

		if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
			console.log('invalid password');
			return fail(400, {
				message: 'Invalid password'
			});
		}

		const hashedPassword = await new Argon2id().hash(password);

		const doesUserExist = await db.user.findFirst({
			where: {
				email
			}
		});
		if (doesUserExist) {
			console.log('email already in use');
			return fail(400, {
				message: 'Email already in use'
			});
		}
		// TODO: check if email is already used
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
		console.log('redirecting');
		redirect(302, '/protected/dashboard');
	}
};
