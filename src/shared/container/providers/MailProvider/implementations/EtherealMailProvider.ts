import { injectable } from 'tsyringe'
import { IMailProvider } from '../IMailProvider'
import nodemailer, { Transporter } from 'nodemailer'
import handlebars from 'handlebars'
import fs from 'fs'

@injectable()
export class EtherealMailProvider implements IMailProvider {
  private client: Transporter

  constructor () {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: account.user, // generated ethereal user
          pass: account.pass // generated ethereal password
        }
      })
      this.client = transporter
    }).catch((err) => console.error(err))
  }

  async sendMail (to: string, subject: string, variables: any, path: string): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8')
    const templateParse = handlebars.compile(templateFileContent)
    const templateHTML = templateParse(variables)
    const message = await this.client.sendMail({
      to,
      from: 'Rentx <noreply@rentx.com.br>',
      subject,
      html: templateHTML
    })
    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}
