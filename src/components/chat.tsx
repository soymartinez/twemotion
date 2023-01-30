'use client'

import { useInterval } from '@/hooks/useInterval'
import { Sentiment } from '@/pages/api/sentiment'
import { onChat } from '@/utils/twitch'
import { useEffect, useState } from 'react'

interface ChatProps {
    user: string
    message: string
}

export default function Chat() {
    const [chat, setChat] = useState<ChatProps[]>([])
    const [messages, setMessages] = useState<string[]>([])
    const [predictions, setPredictions] = useState<Sentiment | null>(null)

    onChat((user, message) => {
        setChat((prev) => {
            if (prev.length === 100) prev.shift()
            return [...prev, { user, message }]
        })

        setMessages((prev) => {
            if (prev.length === 5) prev.shift()
            return [...prev, message]
        })
    })

    const sendMessages = async () => {
        let prompt = ''
        messages.forEach((message) => {
            prompt += message + ', '
        })

        const response = await fetch('/api/sentiment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(prompt),
        })

        const predictions: Sentiment = await response.json()

        if (predictions.classifications) {
            setPredictions(predictions)
        }
    }

    useInterval(() => {
        if (messages.length > 0) sendMessages()
    }, 1000)

    useEffect(() => {
        const container = document.getElementById('container')
        if (container) container.scrollTop = container.scrollHeight
    }, [messages])
    return (
        <section className='flex flex-col grow'>
            <div id='container' className='h-0 flex flex-col grow overflow-hidden overflow-y-auto'>
                {chat.map((message, index) => (
                    <div className='px-[10px]'>
                        <div key={index} className='text-sm px-[10px] py-[5px] rounded hover:bg-[#3d3d40]'>
                            <span className='font-bold'>{message.user}</span>: <span>{message.message}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-center p-8'>
                {predictions
                    ? <p className='text-4xl font-black'>{predictions.classifications[0].prediction}</p>
                    : <p>Waiting for emotions...</p>}
            </div>
        </section>
    )
}
