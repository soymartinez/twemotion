'use client'

import { motion } from 'framer-motion'

export default function Card({ style }: { style: any }) {
    return (
        <motion.article
            className='rounded-2xl bg-gray-dark hh-64 ww-48 h-full'
            style={style}
        >
        </motion.article>
    )
}
