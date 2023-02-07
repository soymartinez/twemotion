'use client'

import { useEffect } from 'react'

export default function Button() {

    useEffect(() => {
        let button = document.querySelector('button')

        // let rough = new RoughEase({
        //     strength: 3,
        //     points: 30,
        //     taper: 'none',
        //     randomize: true
        // })

            // let tl = gsap.timeline({
            //     defaults: { duration: 2, ease: 'sine.out' },
            //     paused: true
            // })

        // let strikes = gsap.utils.toArray('.strike')

        // tl.to('#lightning', { opacity: 1, duration: 0.1 })
        //     .to('.border-gradient', { opacity: 1 })
        //     .to('#filter feDisplacementMap', { attr: { scale: '10' }, ease: 'rough' }, 0)
        //     .to('#filter2 feDisplacementMap', { attr: { scale: '30' }, ease: 'rough' }, 0)
        //     .to('#filter4 feDisplacementMap', { attr: { scale: '40' }, ease: 'rough' }, 0)
        //     // .fromTo(strikes[0], { drawSVG: '100% 90%' }, { drawSVG: '0% 10%' }, 0)
        //     // .fromTo(strikes[1], { drawSVG: '0% 20%' }, { drawSVG: '100% 100%' }, 0)
        //     // .fromTo(strikes[2], { drawSVG: '0% 10%' }, { drawSVG: '135% 140%' }, 0)
        //     // .fromTo(strikes[3], { drawSVG: '120% 140%' }, { drawSVG: '35% 40%' }, 0)
        //     // .fromTo(strikes[4], { drawSVG: '20% 40%' }, { drawSVG: '135% 140%' }, 0)
        //     .to('#lightning', { opacity: 0, duration: 0.3 }, '-=0.4')

        button?.addEventListener('mouseenter', function () {
            // gsap.to('#scribbles', { opacity: 1, duration: 0.3, ease: 'sine.out' })
            // tl.play(0)
        })

        button?.addEventListener('mouseleave', function () {
            // gsap.to('#scribbles', { opacity: 0, duration: 0.6, ease: 'sine.out' })
            // tl.reverse()
        })
    }, [])

    return (
        <>
            <div className='relative'>
                <div className='border-gradient'>
                    <button>
                        <span className='vh'>Button</span>
                    </button>
                    <span className='button-text' aria-hidden='true'>Button</span>
                </div>
                <svg id='scribbles' aria-hidden='true' preserveAspectRatio='none' viewBox='0 0 100 50'>
                    <filter color-interpolation-filters='sRGB' id='glow' x='-50' y='-50' width='200' height='200' filterUnits='userSpaceOnUse'>
                        <feGaussianBlur stdDeviation='10' />
                        <feComponentTransfer>
                            <feFuncA type='linear' slope='2' />
                        </feComponentTransfer>
                        <feBlend in2='SourceGraphic' />
                    </filter>
                    <filter color-interpolation-filters='sRGB' id='filter' x='-50' y='-50' width='200' height='200' filterUnits='userSpaceOnUse'>
                        <feTurbulence type='fractalNoise' baseFrequency='0.15 0' numOctaves='1' result='warp'></feTurbulence>
                        <feDisplacementMap xChannelSelector='R' yChannelSelector='G' scale='5' in='SourceGraphic' in2='warp' />
                    </filter>
                    <filter color-interpolation-filters='sRGB' id='filter2' x='-50' y='-50' width='200' height='200' filterUnits='userSpaceOnUse'>
                        <feTurbulence type='fractalNoise' baseFrequency='0.2 0' numOctaves='1' result='warp'></feTurbulence>
                        <feDisplacementMap xChannelSelector='R' yChannelSelector='G' scale='10' in='SourceGraphic' in2='warp' />
                    </filter>
                    <filter color-interpolation-filters='sRGB' id='filter3' x='-50' y='-50' width='200' height='200' filterUnits='userSpaceOnUse'>
                        <feTurbulence type='fractalNoise' baseFrequency='0.2 0.2' numOctaves='1' result='warp'></feTurbulence>
                        <feDisplacementMap xChannelSelector='R' yChannelSelector='G' scale='5' in='SourceGraphic' in2='warp' />
                    </filter>
                    <filter color-interpolation-filters='sRGB' id='filter4' x='-50' y='-50' width='200' height='200' filterUnits='userSpaceOnUse'>
                        <feTurbulence type='fractalNoise' baseFrequency='0.2 0.2' numOctaves='1' result='warp'></feTurbulence>
                        <feDisplacementMap xChannelSelector='R' yChannelSelector='G' scale='5' in='SourceGraphic' in2='warp' />
                    </filter>

                    <linearGradient gradientUnits='userSpaceOnUse' id='gradient'>
                        <stop offset='0%' stop-color='#ffe17e' />
                        <stop offset='10%' stop-color='#f65426' />
                        <stop offset='50%' stop-color='#fff' />
                        <stop offset='100%' stop-color='#6ff5ff' />
                    </linearGradient>

                    <linearGradient gradientUnits='userSpaceOnUse' id='gradient2' gradientTransform='rotate(65)'>
                        <stop offset='0%' stop-color='#ffe17e' />
                        <stop offset='10%' stop-color='#f65426' />
                        <stop offset='50%' stop-color='#fff' />
                        <stop offset='100%' stop-color='#6ff5ff' />
                    </linearGradient>

                    <linearGradient gradientUnits='userSpaceOnUse' id='gradient3'>
                        <stop offset='0%' stop-color='#69eeff' />
                        <stop offset='50%' stop-color='#fff' />
                        <stop offset='100%' stop-color='#69eeff' />
                    </linearGradient>

                    <g id='lightning' stroke-width='1' filter='url(#glow)' stroke='url(#gradient)'>
                        <rect filter='url(#filter)' className='strike' stroke='url(#gradient)' x='0' y='0' width='100' height='50' rx='38.59' fill='none' stroke-miterlimit='10' stroke-width='1.5' />
                        <rect filter='url(#filter2)' className='strike' stroke='url(#gradient2)' x='0' y='0' width='100' height='50' rx='38.59' fill='none' stroke-miterlimit='10' stroke-width='2' />
                        <rect filter='url(#filter3)' className='strike' stroke='url(#gradient3)' x='0' y='0' width='100' height='50' rx='38.59' fill='none' stroke-miterlimit='10' stroke-width='1.5' />
                        <rect filter='url(#filter2)' className='strike' stroke='url(#gradient3)' x='0' y='0' width='100' height='50' rx='38.59' fill='none' stroke-miterlimit='10' stroke-width='1' />
                        <rect filter='url(#filter4)' className='strike' stroke='url(#gradient3)' x='0' y='0' width='100' height='50' rx='38.59' fill='none' stroke-miterlimit='10' stroke-width='1.5' />
                    </g>
                </svg>
            </div>
            <style jsx>{`
                .container {
                    position: relative;
                }
                
                button {
                    cursor: pointer;
                    width: 200px;
                    height: 75px;
                    display: inline-block;
                    -webkit-font-smoothing: antialiased;
                    background-color: #081649;
                    text-decoration: none;
                    padding: 0.75em 1.75em;
                    border-radius: 99px;
                    border: none;
                    transition: background-color 0.6 ease-out;
                }
                
                :focus:not(:focus-visible) { outline: none }
                
                button:hover {
                    background-color: #0f2473;
                }
                
                button:focus {
                    background-color: #0f2473;
                    outline: 5px solid #a0fdfe;
                }
                
                .border-gradient {
                    padding: 4px;
                    opacity: 0.8;
                    border-radius: 99px;
                    background: rgb(177, 131, 255);
                    background: linear-gradient(
                    90deg,
                    rgb(177, 131, 255) 0%,
                    rgb(85 114 199) 100%
                    );
                }
                
                .button-text {
                    pointer-events: none;
                    position: absolute;
                    top: 50%;
                    left: 0;
                    width: 100%;
                    transform: translateY(-55%);
                    text-align: center;
                    font-family: "Montserrat", sans-serif;
                    font-weight: 500;
                    font-size: 1.6rem;
                    user-select: none;
                    letter-spacing: 1.5px;
                    color: white;
                }
                
                #scribbles {
                    pointer-events: none;
                    opacity: 0;
                    position: absolute;
                    height: 100%;
                    width: 100%;
                    left: 0;
                    top: 0;
                    overflow: visible;
                }
                
                .vh {
                    clip: rect(0 0 0 0);
                    clip-path: inset(50%);
                    height: 1px;
                    overflow: hidden;
                    position: absolute;
                    white-space: nowrap;
                    width: 1px;
                }
            `}</style>
        </>
    )
}
