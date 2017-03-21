import { Logger } from './logger'
import { inject, injectable } from 'inversify'


@injectable()
export class Apns {

    constructor( @inject(Logger) private logger: Logger) { }

    sendNotification() {

    }
}