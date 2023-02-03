'use client'

import { useInterval } from '@/hooks/useInterval'
import { Sentiment } from '@/pages/api/sentiment'
import { ChatProps } from '@/types/tmi'
import { onChat } from '@/utils/twitch'
import { useEffect, useState, useRef } from 'react'

export default function Chat() {
    const [chat, setChat] = useState<ChatProps[]>([])
    const [messages, setMessages] = useState<string[]>([])
    const [predictions, setPredictions] = useState<Sentiment | null>(null)
    const container = useRef<HTMLDivElement>(null)

    onChat((user, message) => {
        setChat((prev) => {
            const { scrollHeight, scrollTop, offsetHeight } = container.current as HTMLDivElement
            const scrollBottom = scrollTop + offsetHeight >= scrollHeight

            if (scrollBottom && prev.length > 100) prev.shift()
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

    const autoScroll = () => {
        const { offsetHeight, scrollHeight, scrollTop } = container.current as HTMLDivElement
        if (scrollHeight <= scrollTop + offsetHeight + 100) {
            container.current?.scrollTo(0, scrollHeight)
        }
    }

    useInterval(() => {
        if (messages.length > 0) sendMessages()
    }, 1000)

    useEffect(() => {
        autoScroll()
    }, [messages])
    return (
        <section className='flex flex-col grow'>
            <div ref={container} className='h-0 flex flex-col grow overflow-hidden overflow-y-auto'>
                {chat.map(({ userstate, message }, index) => (
                    <div key={index} className='px-[10px]'>
                        <div className='text-sm px-[10px] py-[5px] rounded hover:bg-[#3d3d40]'>
                            <span className='font-bold' style={{ color: userstate.color }} >{userstate.username}</span>: <span>{message}</span>
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
