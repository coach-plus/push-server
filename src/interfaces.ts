export interface IDevice {
    system: string
    deviceId: string
    pushId: string
}

export interface IPushRequest {
    devices: IDevice[]
    title: string
    content: string
}