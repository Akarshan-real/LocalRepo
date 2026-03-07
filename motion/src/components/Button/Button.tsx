"use client"
import { motion } from "motion/react"

const Button = () => {
    return (
        <div className='perspective-[1000px] transform-3d min-h-screen w-full bg-neutral-950 flex justify-center items-center'
            style={{
                backgroundImage: "radial-gradient(circle at 0.5px 0.5px ,rgba(6,182,212,0.2) 0.5px,transparent 0)",
                backgroundSize: "8px 8px",
                backgroundRepeat: "repeat"
            }}
        >
            <motion.button
            whileHover={{
                rotateX : 25,
                rotateY : 15,
                boxShadow : "0px 20px 50px rgba(8,112,184,0.7)",
                y : -10
            }}
            whileTap={{
                rotateX : 0,
                rotateY : 0,
                y : 0,
                transition : { duration : 0.08}
            }}
            style={{
                translateZ: 100
            }}
            transition={{
                duration : 0.3,
                ease : "easeInOut"
            }}
                className="group cursor-pointer relative text-neutral-500 px-12 py-4 rounded-lg bg-black shadow-[0px_1px_2px_0px_rgba(255,255,255,0.1)_inset,0px_-1px_2px_0px_rgba(255,255,255,0.1)_inset]">
                <span className="absolute inset-x-0 -bottom-px bg-linear-to-r from-transparent via-cyan-400 to-transparent h-px w-3/4 mx-auto "></span>
                <span className="group-hover:text-cyan-400 transition-colors duration-300">Let's go</span>
                <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 inset-x-0 -bottom-px bg-linear-to-r from-transparent via-cyan-400 to-transparent h-0.5 w-full mx-auto blur-sm"></span>
            </motion.button>
        </div>
    )
}

export default Button
