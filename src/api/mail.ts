import * as express from 'express'
import { Logger } from '../logger'
import { inject, injectable } from 'inversify'
import { IPushRequest, IMailRequest } from "../interfaces"
import { Apns } from "../apns"
import { Mail } from "../mail"


@injectable()
export class MailApi {

    constructor( @inject(Logger) private logger: Logger, @inject(Mail) private mail: Mail) { }

    getRouter() {
        let router = express.Router()
        router.post('/', this.sendMail.bind(this))
        return router
    }

    sendMail(req: express.Request, res: express.Response) {
        res.status(200).send({})
        let mailRequest: IMailRequest = req.body
        this.mail.sendMail(mailRequest)
    }
}