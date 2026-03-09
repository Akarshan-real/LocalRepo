"use client"
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { ReactNode, useEffect, useRef, useState } from 'react'

type Card = {
    description: string;
    title: string;
    src: string;
    ctaText: string;
    ctaLink: string;
    content: () => ReactNode;
};

const cards: Card[] = [
    {
        description: "Lana Del Rey",
        title: "Summertime Sadness",
        src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
        ctaText: "Play",
        ctaLink: "https://ui.aceternity.com/templates",
        content: () => {
            return (
                <p className="text-[10px] text-neutral-500">
                    Lana Del Rey, an iconic American singer-songwriter known for her
                    melancholic cinematic style. Her music blends vintage aesthetics,
                    dreamy soundscapes, and introspective storytelling.
                </p>
            );
        },
    },

    {
        description: "The Weeknd",
        title: "Blinding Lights",
        src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
        ctaText: "Play",
        ctaLink: "https://spotify.com",
        content: () => {
            return (
                <p className="text-[10px] text-neutral-500">
                    The Weeknd became globally famous with synthwave-inspired hits like
                    Blinding Lights. His music mixes retro vibes with modern pop and R&B.
                </p>
            );
        },
    },

    {
        description: "Daft Punk",
        title: "Get Lucky",
        src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        ctaText: "Play",
        ctaLink: "https://spotify.com",
        content: () => {
            return (
                <p className="text-[10px] text-neutral-500">
                    Daft Punk revolutionized electronic music with their futuristic
                    sound, robotic personas, and iconic tracks like Get Lucky.
                </p>
            );
        },
    },

    {
        description: "Billie Eilish",
        title: "Bad Guy",
        src: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
        ctaText: "Play",
        ctaLink: "https://spotify.com",
        content: () => {
            return (
                <p className="text-[10px] text-neutral-500">
                    Billie Eilish gained massive popularity with her whispery vocals,
                    dark pop production, and unconventional style.
                </p>
            );
        },
    },
];

const useOutsideClick = (callback: () => void) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            };
        };

        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [callback]);

    return ref;
};




const Card = () => {
    const ref = useOutsideClick(() => {
        if (currentCard) {
            setCurrentCard(null);
        }
    });

    const [currentCard, setCurrentCard] = useState<Card | null>(null);

    return (
        <div className='w-full min-h-screen py-10 bg-gray-400'>
            {currentCard &&
                <div className='fixed inset-0 z-10 w-full h-full bg-black/50 backdrop-blur-sm'>
                </div>
            }

            <AnimatePresence>
                {currentCard &&
                    <>
                        <motion.div
                            layoutId={`card-${currentCard.title}`}
                            ref={ref}
                            className='fixed inset-0 z-20 flex flex-col items-center p-4 m-auto bg-white border w-80 h-150 rounded-2xl border-neutral-200'
                        >
                            <motion.img
                                layoutId={`card-image-${currentCard.title}`}
                                src={currentCard.src}
                                alt={currentCard.title}
                                className='h-70 aspect-square rounded-xl'
                            />
                            <div className='flex flex-col items-start justify-between'>
                                <div className='flex items-start justify-between w-full gap-2 py-4'>
                                    <div className='flex flex-col items-start gap-2'>
                                        <motion.h2 layoutId={`card-title-${currentCard.title}`} className='text-xs font-bold tracking-tight text-black'>{currentCard.title}</motion.h2>
                                        <motion.p layoutId={`card-description-${currentCard.title}`} className='text-[10px] text-neutral-500'>{currentCard.description}</motion.p>
                                    </div>
                                    <motion.div layoutId={`card-cta-${currentCard.title}`}>
                                        <Link href={currentCard.ctaLink} className='px-2 py-1 text-xs text-white bg-green-500 rounded-full'>
                                            {currentCard.ctaText}
                                        </Link>
                                    </motion.div>
                                </div>
                                <div className='h-40 overflow-auto'>
                                    {currentCard.content()}
                                </div>
                            </div>
                        </motion.div>
                    </>
                };
            </AnimatePresence>

            <div className='flex flex-col max-w-lg gap-10 mx-auto'>
                {cards.map((card) => (
                    <motion.button
                        layoutId={`card-${card.title}`}
                        key={card.title}
                        className='flex items-center justify-between p-4 bg-white border rounded-lg cursor-pointer border-neutral-200'
                        onClick={() => setCurrentCard(card)}
                    >
                        <div className='flex items-center gap-4'>
                            <motion.img
                                layoutId={`card-image-${card.title}`}
                                src={card.src}
                                alt={card.title}
                                className='h-14 aspect-square rounded-xl'
                            />
                            <div className='flex flex-col items-start gap-2'>
                                <motion.h2 layoutId={`card-title-${card.title}`} className='text-xs font-bold tracking-tight text-black'>{card.title}</motion.h2>
                                <motion.p layoutId={`card-description-${card.title}`} className='text-xs text-neutral-500'>{card.description}</motion.p>
                            </div>
                        </div>
                        <motion.div layoutId={`card-cta-${card.title}`} className='px-2 py-1 text-xs text-white bg-green-500 rounded-full'>{card.ctaText}</motion.div>
                    </motion.button>
                ))}
            </div>
        </div>
    )
}

export default Card
