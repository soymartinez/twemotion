import comfy from 'comfy.js'

export const connect = async (username: string) => {
    try {
        await new Promise<void>((resolve) => {
            comfy.Init(username)
            onConnected(() => resolve())
        })
    } catch {
        console.log('Error connecting')
    }
}

export const onConnected = (callback: (address: string, port: number) => void) => {
    comfy.onConnected = callback
}

export const onChat = (callback: (user: string, message: string, flags: any, self: boolean) => void) => {
    comfy.onChat = callback
}

export const disconnect = async () => {
    try {
        await new Promise<void>((resolve) => {
            resolve(comfy.Disconnect())
        }).then(() => console.log('Disconnected'))
    } catch {
        console.log('Error disconnecting')
    }
}
