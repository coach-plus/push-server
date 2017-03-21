import * as express from 'express'
import { Logger } from './logger'
import { inject, injectable } from 'inversify'
import { MobileApi } from "./api/mobile"


@injectable()
export class Api {

    constructor( @inject(Logger) private logger: Logger, @inject(MobileApi) private mobileApi: MobileApi) { }

    getRouter() {
        let router = express.Router()
        router.use('/mobile', this.mobileApi.getRouter())
        return router
    }
}