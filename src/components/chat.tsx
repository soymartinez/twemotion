'use client'

import { onChat } from '@/utils/twitch'
import { useEffect, useState } from 'react'

interface ChatProps {
    user: string
    message: string
}

export default function Chat() {
    const [messages, setMessages] = useState<ChatProps[]>([])
    onChat((user, message) => setMessages((messages) => [...messages, { user, message }]))

    useEffect(() => {
        const container = document.getElementById('container')
        if (container) container.scrollTop = container.scrollHeight
    }, [messages])
    return (
        <section>
            <h1>Chat</h1>
            <div id='container' className='h-56 border overflow-y-auto'>
                {messages.map((message, index) => (
                    <div key={index} className='flex gap-2'>
                        <p className='font-bold'>{message.user}</p>
                        {message.message}
                    </div>
                ))}
            </div>
        </section>
    )
}
