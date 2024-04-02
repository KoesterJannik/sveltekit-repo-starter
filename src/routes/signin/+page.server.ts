import { db, lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';

import { Argon2id } from 'oslo/password';

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password');
		console.log('email', email);

		if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
			console.log('invalid password');
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
			console.log('email already in use');
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
		console.log('redirecting');
		redirect(302, '/protected/dashboard');
	}
};
