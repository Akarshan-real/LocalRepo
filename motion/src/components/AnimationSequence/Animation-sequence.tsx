"use client"
import { motion, useAnimate, type AnimationSequence } from 'motion/react'

const AnimationSequence = async () => {
    const [scope, animate] = useAnimate();

    const startAnimating = async () => {
        const sequence: AnimationSequence = [
            [".loader", {
                width: "1.25rem",
                opacity: 1,
                scale: 1
            }, { duration: 0.1 }],
            [".loader", {
                rotate: 360 * 4,
            }, { duration: 2 }],
            [".loader", {
                opacity: 0,
                scale: 0
            }, { duration: 0.1 }],
            [".text", {
                display: "none",
            }, { duration: 0.1 }],
            ["button", {
                width: "5rem",
                borderRadius: "1000px",
            }, { duration: 0.3 }],
            ["button", {
                background: "var(--color-green-500)",
                scale: [1, 1.2, 0.8, 1],
            }, { duration: 0.5 }],
            [".check-icon", {
                opacity: 1
            }, { duration: 0.2 }],
            [".check-icon path", {
                pathLength: 1,
            }, { duration: 0.5 }],
        ];
        animate(sequence);
        // await animate(".loader", {
        //     width: "1.25rem",
        //     opacity: 1,
        //     scale: 1,
        // }, {
        //     duration: 0.1
        // });
        // await animate(".loader", {
        //     rotate: 360 * 4,
        // }, {
        //     duration: 2,
        // });
        // animate(".loader", {
        //     opacity: 0,
        //     scale: 0,
        // }, {
        //     duration: 0.1
        // });
        // animate(".text", {
        //     display: "none",
        // }, {
        //     duration: 0.1
        // });
        // await animate("button", {
        //     width: "5rem",
        //     borderRadius: "1000px",
        // }, {
        //     duration: 0.3
        // });
        // animate("button", {
        //     background: "var(--color-green-500)",
        //     scale: [1, 1.2, 0.8, 1],
        // }, {
        //     duration: 0.5
        // });
        // await animate(".check-icon", {
        //     opacity: 1
        // }, { duration: 0.2 });
        // animate(".check-icon path", {
        //     pathLength: 1,
        // }, {
        //     duration: 0.5
        // });
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
                className='h-20 gap-2 flex items-center justify-center font-medium text-white rounded-lg cursor-pointer bg-linear-to-r from-purple-500 via-violet-600 to-indigo-500'
            >
                <motion.svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="loader h-5 w-5 text-white"
                    initial={{
                        width: "0rem",
                        scale: 0,
                    }}
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 3a9 9 0 1 0 9 9" />
                </motion.svg>
                <span className='text'>Purchase now ($69)</span>
            </motion.button>

            <motion.svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="#FFFFFF"
                strokeWidth={3}
                className="check-icon h-8 w-8 absolute inset-0 m-auto z-50 pointer-events-none"
                style={{
                    opacity: 0
                }}
            >
                <motion.path
                    initial={{
                        pathLength: 0,
                    }}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                />
            </motion.svg>
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
