import { db } from '../../../../lib/server/auth';

export const load = async (event) => {
	const user = await event.locals.user;

	const boughtProducts = await db.boughtProduct.findMany({
		where: {
			userId: user!.id
		},
		include: {
			product: true
		}
	});

	return {
		boughtProducts
	};
};
