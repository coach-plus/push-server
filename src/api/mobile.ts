import * as express from 'express'
import { Logger } from '../logger'
import { inject, injectable } from 'inversify'
import { IPushRequest } from "../interfaces"
import { Apns } from "../apns"


@injectable()
export class MobileApi {

    constructor( @inject(Logger) private logger: Logger, @inject(Apns) private apns: Apns) { }

    getRouter() {
        let router = express.Router()
        router.post('/', this.sendNotifications.bind(this))
        return router
    }

    sendNotifications(req: express.Request, res: express.Response) {
        res.status(200).send({})
        let pushRequest: IPushRequest = req.body
        this.apns.sendNotification(pushRequest)
    }
}