import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import type { EmailSendCommandParamsType, IEmailService } from '$lib/shared/types/mailer';

export class AWSEmailService implements IEmailService {
	private emailClient: SESClient = new SESClient({
		region: process.env.AWS_REGION,
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
		}
	});
	constructor(private senderEmailAddress: string = process.env.SENDER_EMAIL!) {}

	async sendEmail(params: EmailSendCommandParamsType): Promise<unknown> {
		return this.emailClient.send(this.createSendEmailCommand(params));
	}
	private createSendEmailCommand({
		subject,
		body,
		receiver
	}: EmailSendCommandParamsType): SendEmailCommand {
		return new SendEmailCommand({
			Source: this.senderEmailAddress,
			Destination: {
				ToAddresses: receiver
			},
			Message: {
				Subject: {
					Charset: 'UTF-8',
					Data: subject
				},
				Body: {
					Text: {
						Charset: 'UTF-8',
						Data: body
					}
				}
			}
		});
	}
}
const mailer = new AWSEmailService();
export default mailer;
