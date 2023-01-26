import comfy from 'comfy.js'

export const connect = (username: string) => {
    try {
        comfy.Init(username)
        console.log('Connected')
    } catch {
        console.log('Error connecting')
    }
}

export const onChat = (callback: (user: string, message: string, flags: any, self: boolean) => void) => {
    comfy.onChat = callback
}

export const disconnect = () => {
    try {
        comfy.Disconnect()
        console.log('Disconnected')
    } catch {
        console.log('Error disconnecting')
    }
}
