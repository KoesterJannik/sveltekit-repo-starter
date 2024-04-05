/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { json, type RequestEvent } from '@sveltejs/kit';
import stripe from './_stripe';
import { db } from '../../../../lib/server/auth';

// todo: orefalo - properly gatekeep this variable
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

function toBuffer(ab: ArrayBuffer): Buffer {
	const buf = Buffer.alloc(ab.byteLength);
	const view = new Uint8Array(ab);
	for (let i = 0; i < buf.length; i++) {
		buf[i] = view[i];
	}
	return buf;
}

export async function POST(event: RequestEvent) {
	// export async function post(req: Request<any, { data: any; type: any }>): Promise<Response> {
	const req = event.request;
	// let data;
	let eventType: string;
	let stripeInformation: any;
	if (WEBHOOK_SECRET) {
		// let event;

		const _rawBody = await req.arrayBuffer();
		const payload = toBuffer(_rawBody);

		// SvelteKit may sometimes modify the incoming request body
		// However, Stripe requires the exact body it sends to construct an Event
		// To avoid unintended SvelteKit modifications, we can use this workaround:
		// const payload = Buffer.from(req.rawBody);

		const signature = req.headers.get('stripe-signature');
		try {
			const event = stripe.webhooks.constructEvent(payload, signature!, WEBHOOK_SECRET);
			const data = event.data;
			stripeInformation = data.object;
			console.log('data', data);
			eventType = event.type;
		} catch (err) {
			return {
				status: 500,
				headers: {},
				body: JSON.stringify({
					error: err
				})
			};
		}
	} else {
		// data = req.body.data;
		//@ts-ignore
		eventType = (await req.formData()).get('type').toString();
	}
	// @ts-ignore
	const paymentIntent = stripeInformation;

	switch (eventType) {
		case 'payment_intent.succeeded':
			console.log('creating');
			await db.boughtProduct.create({
				data: {
					userId: paymentIntent.metadata.userId,
					productId: paymentIntent.metadata.product_id
				}
			});
			await db.userPayment.create({
				data: {
					userId: paymentIntent.metadata.userId,
					productId: paymentIntent.metadata.product_id,
					amount: paymentIntent.amount,
					transactionId: paymentIntent.id
				}
			});
			// Payment is successful and the subscription is created.
			// You should provision the subscription and save the customer ID to your database.
			console.log('Event: checkout.session.completed');
			break;

		default:
		// Unhandled event type
	}

	return json({ received: true });
}
