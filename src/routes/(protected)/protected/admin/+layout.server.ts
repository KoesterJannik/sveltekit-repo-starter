import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async (event) => {
	if (!event.locals.user?.roles.includes('ADMIN')) {
		redirect(302, '/protected/dashboard?message=You are not authorized to view this page.');
	}
}) satisfies LayoutServerLoad;
