export type EmailSendCommandParamsType = {
	subject: string;
	body: string;
	receiver: string[];
};

export interface IEmailService {
	sendEmail(content: EmailSendCommandParamsType): Promise<unknown>;
}
