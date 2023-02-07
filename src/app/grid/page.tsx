'use client'

import Card from '@/ui/card'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

const GRID_AREAS = 'abcdefgh'

export default function GridPage() {
    const { scrollYProgress } = useScroll()

    const spring = useSpring(scrollYProgress, { mass: 0.1, restDelta: 0.0001 })

    const rotate = useTransform(spring, (progress) => progress * 90 + 'deg')
    const inverseRotate = useTransform(
        spring,
        (progress) => -progress * 90 + 'deg'
    )
    const scale = useTransform(spring, (progress) => 1 + progress * 2)

    return (
        <main className='h-[105vh]'>
            <section className='flex justify-center items-center overflow-hidden fixed inset-0'>
                <motion.section
                    style={{
                        display: 'grid',
                        gridTemplateAreas: `
                        '. a a a a . . . .'
                        '. a a a a b b . .'
                        '. a a a a b b . .'
                        'c c c d d d e e .'
                        'c c c d d d e e .'
                        'c c c d d d f f f'
                        '. g g h h h f f f'
                        '. g g h h h f f f'
                        '. . . h h h . . .'
                        '. . . h h h . . .'
                    `,
                        // gridTemplateAreas: `
                        //     '. . . . . . . . . . . . . . . . . . . . .'
                        //     '. . . . . . . . . . . . . . . . . . . . .'
                        //     '. . . . . . . . . . . . . . . . . . . . .'
                        //     '. . . . . . . . c c c . . . . . . . . . .'
                        //     '. . . . . . . . c c c . . . . . . . . . .'
                        //     '. . . . . b b b c c c d d d . . . . . . .'
                        //     '. . . . . b b b c c c d d d . . . . . . .'
                        //     '. . w w w b b b a a a d d d q q q . . . .'
                        //     '. . w w w b b b a a a d d d q q q . . . .'
                        //     '. . w w w e e e a a a f f f q q q . . . .'
                        //     '. . w w w e e e a a a f f f q q q . . . .'
                        //     '. . . . . e e e h h h f f f . . . . . . .'
                        //     '. . . . . e e e h h h f f f . . . . . . .'
                        //     '. . . . . . . . h h h . . . . . . . . . .'
                        //     '. . . . . . . . h h h . . . . . . . . . .'
                        //     '. . . . . . . . . . . . . . . . . . . . .'
                        //     '. . . . . . . . . . . . . . . . . . . . .'
                        //     '. . . . . . . . . . . . . . . . . . . . .'
                        // `,
                        gridTemplateColumns: 'repeat(9, 6vh)',
                        gridTemplateRows: 'repeat(10, 6vh)',
                        gap: 10,
                        transformOrigin: '50% 45%',
                        rotate,
                        scale
                    }}
                >
                    {[...Array(8)].map((_, index) => (
                        <Card
                            key={index}
                            style={{
                                gridArea: GRID_AREAS[index],
                                transform: 'translateZ(0)',
                                // rotate: inverseRotate,
                                // scale: 1.725
                            }}
                        />
                    ))}
                </motion.section>
            </section>
        </main>
    )
}
