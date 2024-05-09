import { ISendMail } from '@config/mail/EtherealMail';

export interface ISendEmailService {
  execute(data: ISendMail): Promise<void>;
}
