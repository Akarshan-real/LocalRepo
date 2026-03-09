"use client"
import { motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react'

const Navbar = () => {
    const navItems = [
        {
            name: 'Home',
            link: '/'
        },
        {
            name: 'About',
            link: '/about'
        },
        {
            name: 'Contact',
            link: '/contact'
        },
        {
            name: 'Login',
            link: '/login'
        }
    ];

    const [hovered, setHovered] = useState<number | null>(null);
    return (
        <div className='py-40'>
            <nav className='max-w-2xl mx-auto bg-gray-100 rounded-full px-2 py-1 flex'>
                {navItems.map((item, idx) => (
                    <Link
                        onMouseEnter={() => setHovered(idx)}
                        onMouseLeave={() => setHovered(null)}
                        key={item.name}
                        href={item.link}
                        className='w-full group relative text-center text-xs py-3'
                    >
                        {hovered === idx && (
                            <motion.div
                                layoutId="hovered"
                                className='absolute inset-0 rounded-full w-full h-full bg-black/80'
                            >
                            </motion.div>
                        )}
                        <span
                            className='relative group-hover:text-neutral-400 text-neutral-500'>
                            {item.name}
                        </span>
                    </Link>
                ))}
            </nav>
        </div>
    )
}

export default Navbar
