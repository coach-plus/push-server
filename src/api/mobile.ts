import * as express from 'express'
import { Logger } from '../logger'
import { inject, injectable } from 'inversify'
import { IPushRequest } from "../interfaces"


@injectable()
export class MobileApi {

    constructor( @inject(Logger) private logger: Logger) { }

    getRouter() {
        let router = express.Router()
        router.post('/', this.sendNotifications.bind(this))
        return router
    }

    sendNotifications(req: express.Request, res: express.Response) {

        let pushNotifications: IPushRequest[] = req.body

        console.log(pushNotifications)

        res.send({})

    }
}