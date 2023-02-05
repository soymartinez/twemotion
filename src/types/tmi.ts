import { ReactNode } from 'react'
import { ChatUserstate } from 'tmi.js'

export interface ChatProps {
    channel: string
    userstate: ChatUserstate
    message: string
    self: boolean
    html?: ReactNode[]
}