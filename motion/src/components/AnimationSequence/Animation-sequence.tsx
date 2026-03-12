"use client"
import { motion, useAnimate } from 'motion/react'

const AnimationSequence = async () => {
    const [scope, animate] = useAnimate();

    const startAnimating = async () => {
        animate(".text", {
            display: "none",
        }, {
            duration: 0.1
        });
        await animate("button", {
            width: "5rem",
            borderRadius: "1000px",
        }, {
            duration: 0.3
        });
        animate("button", {
            background: "var(--color-green-500)",
            scale: [1, 1.2, 0.8, 1],
        }, {
            duration: 0.5
        })
        // animate(".spinning-circle", {
        //     opacity: 1,
        //     scale: [0, 1.2, 0.8, 1],
        // }, {
        //     duration: 0.5
        // });
    }

    return (
        <div
            ref={scope}
            className='relative flex items-center justify-center h-20 w-120'
        >
            <motion.button
                onClick={startAnimating}
                style={{
                    width: "30rem",
                }}
                className='h-20 font-medium text-white rounded-lg cursor-pointer bg-linear-to-r from-purple-500 via-violet-600 to-indigo-500'
            >
                <span className='text'>Purchase now ($69)</span>
            </motion.button>
            {/* <motion.div
                style={{
                    opacity: 0,
                    scale: 0
                }}
                className='spinning-circle h-20 w-20 rounded-full bg-green-500 absolute inset-0 m-auto'>
            </motion.div> */}
        </div>
    )
}

export default AnimationSequence
