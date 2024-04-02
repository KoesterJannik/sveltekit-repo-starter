import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	if (!event.locals.user) redirect(302, '/login');
	return {
		user: event.locals.user
	};
};
