import { z } from 'zod';

export const signinSchema = z.object({
	email: z
		.string({
			required_error: 'Email is required'
		})
		.email()
		.trim()
		.toLowerCase(),
	password: z.string({
		required_error: 'Password is required'
	})
});
