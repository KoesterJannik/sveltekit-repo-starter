import { z } from 'zod';

export const signupSchema = z
	.object({
		email: z
			.string({
				required_error: 'Email is required'
			})
			.email(),
		password: z
			.string({
				required_error: 'Password is required'
			})
			.min(6, 'Password must be at least 6 characters long'),
		confirmPassword: z
			.string({
				required_error: 'Confirm Password is required'
			})
			.min(6, 'Password must be at least 6 characters long')
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.confirmPassword) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Passwords do not match',
				path: ['confirmPassword']
			});
		}
	});
