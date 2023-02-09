'use client'

import { Item } from '@/ui/bubble/item'
import { device, icon } from '@/ui/bubble/settings'
import { motion, useMotionValue } from 'framer-motion'
import { useRef, useState } from 'react';

// Download the Framer Beta: https://www.framer.com/beta/
// Framer Beta API documentation: https://www.framer.com/api/

const cols = 9;
const rows = 12;

// Fill a grid of numbers to represent each app icon
const grid = new Array(rows).fill(0).map((_, i) => new Array(cols).fill(0).map((_, j) => j));

export default function BubblePage() {
    const [isDragging, setIsDragging] = useState(false)

    // We use a ref to access the draggable plane's DOM element
    const containRef = useRef<HTMLDivElement>(null);
    const planeRef = useRef<HTMLDivElement>(null);

    const [plane, setPlane] = useState({
        width: ((icon.size + icon.margin) * cols) + icon.margin * 2,
        height: icon.size * rows,
    });

    const x = useMotionValue((device.width - plane.width) / 2)
    const y = useMotionValue((device.height - plane.height) / 2)

    return (
        <div className={`overflow-hidden bg-black rounded-[50px] relative`} ref={containRef} style={device}>
            <motion.div
                ref={planeRef}
                drag
                // These constraints could be calculated dynamically based on icon.size and grid length
                // dragConstraints={{ left: -650, right: 50, top: -600, bottom: 50 }}
                dragConstraints={{
                    left: (device.width - plane.width) - 50,
                    right: 50,
                    top: (device.height - plane.height) - 50,
                    bottom: 50
                }}
                // dragConstraints={containRef}

                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => setIsDragging(false)}
                // whileTap={{ scale: 0.97 }} // TODO: scale on drag in the x/y direction
                style={{
                    // Likewise these draggable plane dimensions could be calculated, but 1000x1000 is arbitrary and big

                    cursor: isDragging ? 'grabbing' : 'grab',
                    width: plane.width,
                    height: plane.height,
                    x,
                    y,
                    background: '#eeeeee20'
                }}
            >
                {grid.map((rows: number[], rowIndex) =>
                    rows.map(colIndex => (
                        <Item key={colIndex} row={rowIndex} col={colIndex} planeX={x} planeY={y} />
                    ))
                )}
            </motion.div>
        </div>
    );
}
