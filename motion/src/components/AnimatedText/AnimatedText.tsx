"use client";
import { motion, stagger, useAnimate } from 'motion/react';
import { useEffect, useState } from 'react';

const AnimatedText = () => {
    const text = "Welcome to my portfolio! I'm a passionate developer with experience in React, Node.js, and more. I love creating interactive and dynamic web applications that provide great user experiences. Feel free to explore my projects and get in touch if you'd like to collaborate!";

    const [scope, animate] = useAnimate();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    function textAnimation() {
        if (isLoaded) {
            animate("span", {
                opacity: 0,
                filter: "blur(10px)",
                y: 10,
            }, {
                duration: 0.5,
                ease: "easeInOut",
                delay: stagger(0.02)
            })
        } else {
            animate("span", {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
            }, {
                duration: 0.5,
                ease: "easeInOut",
                delay: stagger(0.02)
            })
        }
        setIsLoaded(prev => !prev);
    };

    // useEffect(() => {
    //     startAnimate();
    // }, []); // for auto start at page boot up, you can remove this if you want to start animation on button click only

    return (
        <div
            ref={scope}
            className='max-w-4xl mx-auto text-4xl text-white/85'
        >
            <button
                onClick={textAnimation}
                className='bg-neutral-800 px-4 py-2 rounded-md cursor-pointer active:scale-95 transition block mb-4'
            >
                Who is Akarshan?
            </button>
            {text.split(" ").map((word, index) => (
                <motion.span
                    key={word + index}
                    style={{
                        y: 10,
                        opacity: 0,
                        filter: "blur(10px)"
                    }}
                    className='inline-block'
                >
                    {word} &nbsp;
                </motion.span>
            ))}
        </div>
    );
};

export default AnimatedText;
