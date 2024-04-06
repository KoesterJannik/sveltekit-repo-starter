/*import {
	PRIVATE_SMTP_HOST,
	PRIVATE_SMTP_PASS,
	PRIVATE_SMTP_PORT,
	PRIVATE_SMTP_SECURE,
	PRIVATE_SMTP_SENDER_NAME,
	PRIVATE_SMTP_USER
} from '$env/static/private';
import type { EmailSendCommandParamsType, IEmailService } from '$lib/shared/types/mailer';
import { createTransport, type Transporter } from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

type SenderInfoType = {
	name: string;
	email: string;
};

export class SMTPEmailService implements IEmailService {
	private transporter: Transporter;

	constructor(
		senderInfo: SenderInfoType = {
			name: PRIVATE_SMTP_SENDER_NAME,
			email: process.env.SENDER_EMAIL!
		}
	) {
		const config: SMTPTransport.Options = {
			host: PRIVATE_SMTP_HOST,
			port: Number(PRIVATE_SMTP_PORT),
			secure: PRIVATE_SMTP_SECURE === 'true',
			auth: {
				user: PRIVATE_SMTP_USER,
				pass: PRIVATE_SMTP_PASS
			},
			from: `"${senderInfo.name}" <${senderInfo.email}>`
		};

		this.transporter = createTransport(config);
	}

	async sendEmail(params: EmailSendCommandParamsType): Promise<unknown> {
		return this.transporter.sendMail({
			to: params.receiver.join(', '),
			subject: params.subject,
			text: params.body
		});
	}
}

*/
