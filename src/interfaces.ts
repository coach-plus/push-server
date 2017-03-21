export interface IDevice {
    system: string
    deviceId: string
    pushId: string
}

export interface IPushRequest {
    device: IDevice[]
    title: string
    content: string
}