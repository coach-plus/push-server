import { Config } from './config'
import { Logger } from './logger'
import { inject, injectable } from 'inversify'
import { Provider, Notification, ProviderOptions } from 'apn'
import { IPushRequest } from "./interfaces"


@injectable()
export class Apns {

    apnProvider: Provider
    apnsConfig: any

    constructor( @inject(Logger) private logger: Logger, @inject(Config) private config: Config) {

        this.apnsConfig = config.get('apns')

        let providerOptions: ProviderOptions = {
            token: {
                key: `${__dirname}/../${this.apnsConfig.key}`,
                keyId: this.apnsConfig.keyId,
                teamId: this.apnsConfig.teamId
            },
            production: this.apnsConfig.production
        }

        this.apnProvider = new Provider(providerOptions)

    }

    sendNotification(pushRequest: IPushRequest) {

        let recipients = pushRequest.devices
            .filter(device => device.system == 'ios')
            .map(device => device.pushId)

        let notification = new Notification()
        notification.expiry = Math.floor(Date.now() / 1000) + 3600 * 24; // Expires 1 day from now.
        notification.badge = 1;
        notification.sound = "ping.aiff";
        notification.alert = pushRequest.title;
        notification.payload = pushRequest.content;
        notification.topic = this.apnsConfig.bundleId;

        this.apnProvider.send(notification, recipients)
    }
}