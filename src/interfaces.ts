export interface IDevice {
    system: string
    deviceId: string
    pushId: string
}

export interface IPushRequest {
    devices: IDevice[]
    title: string
    subtitle: string
    content: string
    payload: any
    category: string
}

export interface IMailRequest {
    to: string
    subject: string
    text: string
    html: string
}