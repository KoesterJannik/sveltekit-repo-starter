import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../$types';

export const load = (async (event) => {
	if (event.locals.user) {
		redirect(302, '/protected/dashboard');
	}
}) satisfies LayoutServerLoad;
