import { SMTPEmailService } from './smtp-mailer';
import { AWSEmailService } from './aws-mailer';
import { PRIVATE_EMAIL_PROVIDER } from '$env/static/private';

const mailer = PRIVATE_EMAIL_PROVIDER === 'aws' ? new AWSEmailService() : new SMTPEmailService();

export default mailer;
