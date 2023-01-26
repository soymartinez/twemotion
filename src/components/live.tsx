'use client'

import { connect, disconnect } from '@/utils/twitch'
import { useState } from 'react'
import Chat from './chat'

export default function Live() {
    const [streamer, setStreamer] = useState('')
    return (
        <section>
            <h1>Live</h1>
            <p>Connect to a streamer to see their chat.</p>
            <input type='text' className='rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                placeholder='Streamers name'
                onChange={(e) => setStreamer(e.target.value)}
            />
            <div className='flex gap-3'>
                <button className='px-4 py-1 bg-sky-500 rounded-md' onClick={() => connect(streamer)}>Connect</button>
                <button className='px-4 py-1 bg-sky-800 rounded-md' onClick={() => disconnect()}>Disconnect</button>
            </div>
            <Chat />
        </section>
    )
}
