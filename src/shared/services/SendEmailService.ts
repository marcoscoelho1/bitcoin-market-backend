import EtherealMail, { ISendMail } from '@config/mail/EtherealMail';
import { ISendEmailService } from '@shared/domain/services/ISendEmailService';

export default class SendEmailService implements ISendEmailService {
  async execute(data: ISendMail): Promise<void> {
    await EtherealMail.sendMail(data);
  }
}
