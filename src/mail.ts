import { Config } from './config'
import { Logger } from './logger'
import { inject, injectable } from 'inversify'
import { IPushRequest, IMailRequest } from "./interfaces"
import * as nodemailer from 'nodemailer'

@injectable()
export class Mail {

    transporter: nodemailer.Transporter
    mailConfig: any

    constructor( @inject(Logger) private logger: Logger, @inject(Config) private config: Config) {
        this.mailConfig = config.get('mail')
        let smtpConfig = this.mailConfig.smtp
        this.transporter = nodemailer.createTransport(smtpConfig)
    }

    sendMail(mailRequest: IMailRequest) {

        let mailOptions = {
            from: this.mailConfig.from,
            to: mailRequest.to,
            subject: mailRequest.subject,
            text: mailRequest.subject,
            html: mailRequest.html
        };

        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return this.logger.error(error);
            }
            this.logger.info('E-Mail sent: ' + info.response);
        })

    }
}