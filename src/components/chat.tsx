'use client'

import { onChat } from '@/utils/twitch'
import { useEffect, useState } from 'react'

interface ChatProps {
    user: string
    message: string
}

export default function Chat() {
    const [chat, setChat] = useState<ChatProps[]>([])
    const [messages, setMessages] = useState<string[]>([])

    onChat((user, message) => {
        setChat((prev) => {
            if (prev.length === 100) prev.shift()
            return [...prev, { user, message }]
        })

        setMessages((prev) => {
            if (prev.length === 10) prev.shift()
            return [...prev, message]
        })
    })

    useEffect(() => {
        const container = document.getElementById('container')
        if (container) container.scrollTop = container.scrollHeight
    }, [messages])
    return (
        <section>
            <h1>Chat</h1>
            <div id='container' className='h-56 border overflow-y-auto'>
                {chat.map((message, index) => (
                    <div key={index} className='flex gap-2'>
                        <p className='font-bold'>{message.user}</p>
                        {message.message}
                    </div>
                ))}
            </div>
        </section>
    )
}
