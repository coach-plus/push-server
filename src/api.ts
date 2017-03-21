import * as express from 'express'
import { Logger } from './logger'
import { inject, injectable } from 'inversify'
import { MobileApi } from "./api/mobile"
import { MailApi } from "./api/mail";


@injectable()
export class Api {

    constructor(
        @inject(Logger) private logger: Logger,
        @inject(MobileApi) private mobileApi: MobileApi,
        @inject(MailApi) private mailApi: MailApi) { }

    getRouter() {
        let router = express.Router()
        router.use('/mobile', this.mobileApi.getRouter())
        router.use('/mail', this.mailApi.getRouter())
        return router
    }
}