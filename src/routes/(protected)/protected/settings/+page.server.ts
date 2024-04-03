import { fail } from '@sveltejs/kit';
import { db } from '../../../../lib/server/auth';
import type { PageServerLoad } from './$types';
import { Argon2id } from 'oslo/password';
export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const user = event.locals.user;
		const userFromDb = await db.user.findFirst({
			where: {
				id: user!.id
			}
		});

		const oldPassword = formData.get('oldPassword') as string;
		const newPassword = formData.get('newPassword') as string;
		if (!oldPassword || !newPassword) {
			return fail(400, {
				message: 'Old and new password are required'
			});
		}
		const wasOldPasswordCorrect = await new Argon2id().verify(
			userFromDb!.hashed_password,
			oldPassword as string
		);
		if (!wasOldPasswordCorrect) {
			return fail(400, {
				message: 'Old password is incorrect'
			});
		}
		const hashedPasswordNew = await new Argon2id().hash(newPassword);
		await db.user.update({
			where: {
				id: user!.id
			},
			data: {
				hashed_password: hashedPasswordNew
			}
		});
		return {
			message: 'Password updated'
		};
	}
};
