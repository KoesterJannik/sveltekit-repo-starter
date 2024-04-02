import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	if (!event.locals.user) redirect(302, '/signin');
	return {
		user: event.locals.user
	};
};
