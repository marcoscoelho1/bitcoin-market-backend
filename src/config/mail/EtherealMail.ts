import nodemailer from 'nodemailer';

interface IMailContact {
  name: string;
  email: string;
}

export interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  body: string;
}

export default class EtherealMail {
  static async sendMail({ to, from, subject, body }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Equipe Bitcoin Market',
        address: from?.email || 'team@bitcoinmarket.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      text: body,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
