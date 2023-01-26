'use client'

import { connect, disconnect } from '@/utils/twitch'
import Chat from './chat'

export default function Live() {
    return (
        <section>
            <h1>Live</h1>
            <p>Connect to a streamer to see their chat.</p>
            <div className='flex gap-3'>
                <button className='px-4 py-1 bg-sky-500 rounded-md' onClick={() => connect('shroud')}>Connect</button>
                <button className='px-4 py-1 bg-sky-800 rounded-md' onClick={() => disconnect()}>Disconnect</button>
            </div>
            <Chat />
        </section>
    )
}
