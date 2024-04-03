// src/hooks.server.ts
import { lucia } from '$lib/server/auth';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/protected/admin')) {
		const sessionId = event.cookies.get(lucia.sessionCookieName);
		if (!sessionId) {
			event.locals.user = null;
			event.locals.session = null;
			return new Response(null, {
				status: 300,
				headers: { location: '/signin' }
			});
		}

		const { session, user } = await lucia.validateSession(sessionId);

		if (session && session.fresh) {
			const sessionCookie = lucia.createSessionCookie(session.id);
			// sveltekit types deviates from the de-facto standard
			// you can use 'as any' too
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		}
		if (!session) {
			const sessionCookie = lucia.createBlankSessionCookie();
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		}
		if (user && user.roles.includes('ADMIN')) {
			event.locals.user = user;
			event.locals.session = session;
			return resolve(event);
		}

		return new Response(null, {
			status: 300,
			headers: { location: '/protected/dashboard' }
		});
	} else if (event.url.pathname.startsWith('/protected')) {
		const sessionId = event.cookies.get(lucia.sessionCookieName);
		if (!sessionId) {
			event.locals.user = null;
			event.locals.session = null;
			return new Response(null, {
				status: 300,
				headers: { location: '/signin' }
			});
		}

		const { session, user } = await lucia.validateSession(sessionId);
		if (session && session.fresh) {
			const sessionCookie = lucia.createSessionCookie(session.id);
			// sveltekit types deviates from the de-facto standard
			// you can use 'as any' too
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		}
		if (!session) {
			const sessionCookie = lucia.createBlankSessionCookie();
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		}
		event.locals.user = user;
		event.locals.session = session;
		return resolve(event);
	}
	return resolve(event);
};
