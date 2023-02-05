'use client'

import { useInterval } from '@/hooks/useInterval'
import { Sentiment } from '@/pages/api/sentiment'
import { ChatProps } from '@/types/tmi'
import { onChat, removeListeners } from '@/utils/twitch'
import Image from 'next/image'
import { useEffect, useState, useRef, ReactNode } from 'react'

export default function Chat() {
    const [chat, setChat] = useState<ChatProps[]>([])
    const [messages, setMessages] = useState<string[]>([])
    const [predictions, setPredictions] = useState<Sentiment | null>(null)
    const container = useRef<HTMLDivElement>(null)

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

    const emoticons = (message: string, emoticon: { [emoteid: string]: string[] } | undefined) => {
        const URL = `https://static-cdn.jtvnw.net/emoticons/v2`
        let newMessage: string = ''
        let html: ReactNode[] = []
        if (emoticon) {
            Object.entries(emoticon).forEach(([id, positions]) => {
                positions.map((index) => {
                    const [start, end] = index.split('-')
                    newMessage = message.replaceAll(message.substring(Number(start), Number(end) + 1), `${URL}/${id}/default/dark/1.0`)
                })
            })

            newMessage.split(' ').map((word, i) => {
                if (word.startsWith(URL)) {
                    html = [...html, <div className='inline-flex justify-center items-center align-middle -my-1'>
                        <Image key={i} src={word} alt='emoticon' width={28} height={28} />
                    </div>]
                } else {
                    html = [...html, <span key={i}>{word}</span>]
                }
            })
            return html
        }
        return [<span key={html.length}>{message}</span>]
    }

    useInterval(() => {
        if (messages.length > 0) sendMessages()
    }, 1000)

    useEffect(() => {
        onChat((props) => {
            const html = emoticons(props.message, props.userstate.emotes)
            setChat((prev) => {
                const { scrollHeight, scrollTop, offsetHeight } = container.current as HTMLDivElement
                const scrollBottom = scrollTop + offsetHeight >= scrollHeight

                if (scrollBottom && prev.length > 100) prev.shift()
                return [...prev, { ...props, html }]
            })

            setMessages((prev) => {
                if (prev.length === 5) prev.shift()
                return [...prev, props.message]
            })
        })

        return () => removeListeners()
    }, [])

    useEffect(() => {
        autoScroll()
    }, [messages])
    return (
        <section className='flex flex-col grow'>
            <div ref={container} className='h-0 flex flex-col grow overflow-hidden overflow-y-auto'>
                {chat.map(({ userstate, html }, index) => (
                    <div key={index} className='px-[10px]'>
                        <div className='text-sm px-[10px] py-[5px] rounded hover:bg-[#3d3d40]'>
                            <div className='inline-block font-bold' style={{ color: userstate.color }}>
                                {userstate['display-name']}
                            </div>
                            <span>: </span>
                            {html?.map((html, i) => <span key={i}>{html}{' '}</span>)}
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
