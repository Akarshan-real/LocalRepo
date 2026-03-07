"use client"
import { cn } from "@/lib/utils"
import { Icon24Hours, Icon360View, Icon3dCubeSphere, IconMessage, IconPlus, IconX } from "@tabler/icons-react"
import { AnimatePresence, motion } from "motion/react"
import Image from "next/image"
import { useState } from "react"

const Card = () => {
    const [open, setOpen] = useState<boolean>(true);
    return (
        <>
            <AnimatePresence>
                {open && <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.98,
                        filter : "blur(10px)"
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        filter : "blur(0px)"
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0.98,
                        filter: "blur(10px)"
                    }}
                    transition={{
                        duration: 0.5,
                        ease: "easeInOut"
                    }}
                    className={cn("w-80 h-122 rounded-x", "shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]", "p-6 flex flex-col")}
                >
                    <h2 className="font-bold text-[10px]">Acetrenity UI Component</h2>
                    <p className="text-neutral-600 mt-2">A collection beautiful UI components , let's get on with it.</p>
                    <div className="flex items-center justify-center">
                        <button
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-1 text-[10px] mt-4 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] rounded-md px-2 py-1 cursor-pointer">
                            <Image
                                width={50}
                                height={50}
                                className="h-4 w-4"
                                alt="logo"
                                src={"https://ui.aceternity.com/logo-dark.png"}
                            />
                            {" "}
                            Acetrenity
                            <IconX className="h-3 w-3 text-neutral-400" />
                        </button>
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-lg relative mt-4 border border-dashed border-neutral-300">

                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.98,
                                filter: "blue(10px)"
                            }}
                            whileHover={{
                                opacity: 1,
                                scale: 1.05,
                                filter: "blur(0px)"
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 100,
                                damping: 15,
                                mass: 1
                            }}
                            className="absolute inset-0 h-full w-full bg-white rounded-lg border-neutral-200 divide-y divide-neutral-200">

                            <div className="flex gap-2 p-4">
                                <div className="h-7 w-7 shrink-0 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] bg-white rounded-md flex items-center justify-center">
                                    <IconMessage className="h-4 w-4 text-neutral-600" />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-[8px] font-bold text-neutral-600">Acetrenity UI Components</p>
                                    <p className="mt-1 text-neutral-400 text-[8px]">A collection of UI components</p>
                                </div>
                            </div>

                            <div className="flex gap-2 p-4">
                                <div className="h-7 w-7 shrink-0 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] bg-white rounded-md flex items-center justify-center">
                                    <Icon24Hours className="h-4 w-4 text-neutral-600" />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-[8px] font-bold text-neutral-600">24 Hour</p>
                                    <p className="mt-1 text-neutral-400 text-[8px]">hatimatimtim tara mathe pare dim tadewr khara duto sim</p>
                                </div>
                            </div>

                            <div className="flex gap-2 p-4">
                                <div className="h-7 w-7 shrink-0 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] bg-white rounded-md flex items-center justify-center">
                                    <Icon360View className="h-4 w-4 text-neutral-600" />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-[8px] font-bold text-neutral-600">360 all time</p>
                                    <p className="mt-1 text-neutral-400 text-[8px]">bapuram spaure kothajas bapure ay abab dekhe ja 2 to sap rekhe ja</p>
                                </div>
                            </div>

                            <div className="flex gap-2 p-4">
                                <div className="h-7 w-7 shrink-0 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] bg-white rounded-md flex items-center justify-center">
                                    <Icon3dCubeSphere className="h-4 w-4 text-neutral-600" />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-[8px] font-bold text-neutral-600">Some other components</p>
                                    <p className="mt-1 text-neutral-400 text-[8px]">A collection of UI components</p>
                                </div>
                            </div>

                            <div className="flex gap-2 p-4 items-center justify-center">
                                <div className="h-4 w-4 shrink-0 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] bg-white rounded-md flex items-center justify-center">
                                    <IconPlus className="h-3 w-3 text-neutral-600" />
                                </div>
                                <div className="flex flex-col">
                                    <p className="mt-1 text-neutral-400 text-[8px]">Create Project</p>
                                </div>
                            </div>

                        </motion.div>
                    </div>
                </motion.div>}
            </AnimatePresence>
        </>
    )
}

export default Card
