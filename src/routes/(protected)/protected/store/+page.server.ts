import { fail, redirect } from '@sveltejs/kit';
import { db } from '../../../../lib/server/auth';

import stripe from '../../../api/stripe/webhook/_stripe';

export const load = async () => {
	const availableProducts = await db.product.findMany();
	return {
		products: availableProducts
	};
};

export const actions = {
	buyProduct: async (event) => {
		const formData = await event.request.formData();
		const productId = formData.get('productId') as string;
		const user = event.locals.user;
		if (!productId) {
			return fail(400, {
				message: 'Product ID is required'
			});
		}
		const productFromDb = await db.product.findUnique({
			where: {
				id: productId
			}
		});
		if (!productFromDb) {
			return fail(400, {
				message: 'Product not found'
			});
		}

		const PRICE_IN_USD = productFromDb.price;
		const PRICE_IN_CENTS = PRICE_IN_USD * 100;

		const BASE_URL = process.env.BASE_URL!;

		const SUCCESS_REDIRECT = BASE_URL + '/protected/payment/success';
		const CANCEL_REDIRECT = BASE_URL + '/protected/payment/cancel';

		const checkoutSite = await stripe.checkout.sessions.create({
			//success_url: `${this.configService.get('FRONTEND_URL')}/success)}`,
			success_url: SUCCESS_REDIRECT,
			line_items: [
				{
					price_data: {
						currency: 'usd',
						unit_amount: PRICE_IN_CENTS,
						product_data: {
							name: productFromDb.name
						}
					},
					quantity: 1
				}
			],
			payment_intent_data: {
				metadata: {
					userId: user!.id,
					product_id: productFromDb.id,
					price: PRICE_IN_USD
				}
			},
			mode: 'payment',
			//cancel_url: `${this.configService.get('FRONTEND_URL')}/cancel)}`,
			cancel_url: CANCEL_REDIRECT
		});
		throw redirect(303, checkoutSite.url!);
	}
};
