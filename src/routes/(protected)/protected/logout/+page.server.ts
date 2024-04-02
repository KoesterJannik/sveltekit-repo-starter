import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async (event) => {
		console.log('logout');
		if (!event.locals.session) {
			console.log('no session');
			return fail(401);
		}
		await lucia.invalidateSession(event.locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
		redirect(302, '/signin');
	}
};
