import nodemailer from 'nodemailer'

import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "d8a08542bab64a",
    pass: "2cbb4dfad91152"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
        from: 'Equipe Feedget <oi@feedget.com>',
        to: 'Millena Bomtempo <millena.bomtempo@gmail.com>',
        subject,
        html: body
      })
  }
}