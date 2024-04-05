import { SMTPEmailService } from './smtp-mailer';
import { AWSEmailService } from './aws-mailer';

const EMAIL_PROVODER = process.env.EMAIL_PROVIDER;

const mailer = EMAIL_PROVODER === 'aws' ? new AWSEmailService() : new SMTPEmailService();

export default mailer;
