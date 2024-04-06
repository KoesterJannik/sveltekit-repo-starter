import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	if (!event.locals.user) {
		const next = encodeURIComponent(event.url.pathname + event.url.search);

		redirect(302, `/auth/signin?next=${next}`);
	}

	return {
		user: event.locals.user
	};
};
