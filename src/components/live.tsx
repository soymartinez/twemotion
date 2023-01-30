'use client'

import { connect, disconnect } from '@/utils/twitch'
import { useState } from 'react'
import Chat from './chat'

export default function Live() {
    const [streamer, setStreamer] = useState('')
    const [status, setStatus] = useState<'Connect' | 'Connected' | 'Disconnect' | 'Connecting'>('Connect')
    const [loading, setLoading] = useState(false)

    const handleConnect = async () => {
        setLoading(true)
        await connect(streamer).then(() => {
            setStatus('Disconnect')
            setLoading(false)
        })
    }

    const handleDisconnect = async () => {
        await disconnect().then(() => {
            setStatus('Connect')
        })
    }
    return (
        <section className='flex flex-col h-screen'>
            <div className='px-[10px] py-3 border-b border-[#2a2a2d]'>
                <form
                    className='flex gap-2 justify-center items-center'
                    onSubmit={(e) => {
                        e.preventDefault()
                        status === 'Connect' && handleConnect()
                        status === 'Disconnect' && handleDisconnect()
                    }}
                >
                    <input type='text' className='rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                        placeholder='Streamers name'
                        required
                        onChange={(e) => setStreamer(e.target.value)}
                    />
                    <button
                        type={'submit'}
                        className='py-2 px-4 flex justify-center items-center bg-purple-600 hover:bg-purple-700 focus:ring-purple-600 focus:ring-offset-blue-200 text-white transition text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg '
                    >
                        {loading &&
                            <svg width='20' height='20' fill='currentColor' className='mr-2 animate-spin' viewBox='0 0 1792 1792' xmlns='http://www.w3.org/2000/svg'>
                                <path d='M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z'>
                                </path>
                            </svg>}
                        {status}
                    </button>
                </form>
            </div>
            {status === 'Disconnect' && <Chat />}
        </section>
    )
}
