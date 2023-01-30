import Image from 'next/image'
import { Inter } from '@next/font/google'
import Live from '@/components/live'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <Live />
    </main>
  )
}
