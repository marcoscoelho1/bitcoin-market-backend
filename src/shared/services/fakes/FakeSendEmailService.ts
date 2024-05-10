import { ISendMail } from '@config/mail/EtherealMail';
import { ISendEmailService } from '@shared/domain/services/ISendEmailService';

export default class FakeSendEmailService implements ISendEmailService {
  async execute(data: ISendMail): Promise<void> {}
}
