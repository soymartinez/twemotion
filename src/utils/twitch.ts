import { ChatProps } from '@/types/tmi'
import tmi from 'tmi.js'

let client: tmi.Client | null = null

export const connect = async (username: string) => {
    try {
        client = new tmi.Client({
            connection: {
                reconnect: true,
                secure: true,
            },
            channels: [username],
        })

        return await client.connect()
            .then(() => console.log(`Connected to ${username}`))
    } catch {
        console.log('Error connecting')
    }
}

export const onChat = (callback: (props: ChatProps) => void) => {
    client?.on('chat', (channel, userstate, message, self) => callback({
        channel,
        userstate,
        message,
        self,
    }))
}

export const disconnect = async () => {
    try {
        return await client?.disconnect()
            .then(() => console.log('Disconnected'))
    } catch {
        console.log('Error disconnecting')
    }
}

export const removeListeners = () => {
    client?.removeAllListeners()
}
