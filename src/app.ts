import 'reflect-metadata'
import { injectable, inject, Container } from 'inversify'
import { Logger } from './logger'
import { Api } from './api'
import { Server } from './server'
import { Config } from './config'
import { MobileApi } from "./api/mobile"
import { Apns } from "./apns"
import { MailApi } from "./api/mail"
import { Mail } from "./mail"

let container = new Container()

container.bind<Logger>(Logger).toSelf().inSingletonScope()
container.bind<Config>(Config).toSelf().inSingletonScope()
container.bind<Api>(Api).toSelf().inSingletonScope()
container.bind<MobileApi>(MobileApi).toSelf().inSingletonScope()
container.bind<MailApi>(MailApi).toSelf().inSingletonScope()
container.bind<Apns>(Apns).toSelf().inSingletonScope()
container.bind<Mail>(Mail).toSelf().inSingletonScope()
container.bind<Server>(Server).toSelf().inSingletonScope()

let logger = container.get<Logger>(Logger)
let config = container.get<Config>(Config)
config.init(`${__dirname}/../.env.json`)

let server = container.get<Server>(Server)
server.start()