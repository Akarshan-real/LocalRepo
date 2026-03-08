"use client";

import {
  IconBrain,
  IconRocket,
  IconSparkles,
  IconWorld,
} from "@tabler/icons-react";
import { motion, useMotionTemplate, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";

type Feature = {
  icon: ReactNode;
  title: string;
  description: string;
  content: ReactNode;
};

const features: Feature[] = [
  {
    icon: <IconRocket className="w-8 h-8 text-neutral-200" />,
    title: "Generate ultra realistic images in seconds",
    description:
      "With our state of the art AI, you can generate ultra realistic images in no time at all.",
    content: (
      <div>
        <Image
          src="https://assets.aceternity.com/pro/car-1.jpg"
          alt="car"
          height={500}
          width={500}
          className="rounded-lg"
        />
      </div>
    ),
  },
  {
    icon: <IconSparkles className="w-8 h-8 text-neutral-200" />,
    title: "Creative AI powered designs",
    description:
      "Let AI assist you in generating stunning creative designs for websites, products, and more.",
    content: (
      <div>
        <Image
          src="https://assets.aceternity.com/pro/car-2.jpg"
          alt="design"
          height={500}
          width={500}
          className="rounded-lg"
        />
      </div>
    ),
  },
  {
    icon: <IconBrain className="w-8 h-8 text-neutral-200" />,
    title: "Smart AI understanding",
    description:
      "Our AI understands context and produces results that align perfectly with your prompts.",
    content: (
      <div>
        <Image
          src="https://assets.aceternity.com/pro/car-3.jpg"
          alt="ai brain"
          height={500}
          width={500}
          className="rounded-lg"
        />
      </div>
    ),
  },
  {
    icon: <IconWorld className="w-8 h-8 text-neutral-200" />,
    title: "Accessible from anywhere",
    description:
      "Use our AI platform anywhere in the world with lightning fast cloud infrastructure.",
    content: (
      <div>
        <Image
          src="https://assets.aceternity.com/pro/car-4.jpg"
          alt="global access"
          height={500}
          width={500}
          className="rounded-lg"
        />
      </div>
    ),
  },
];

const MotionHookExample = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgrounds = ["#04052e", "#1a1a1a", "#072030", "#200116"];
  const [background, setBackground] = useState(backgrounds[0]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("Latest-->", latest);
    setBackground(backgrounds[Math.floor(latest * backgrounds.length)]);
  });

  return (
    <motion.div
      ref={containerRef}
      animate={{
        backgroundColor: background
      }}
      transition={{
        duration : 0.3,
        ease : "easeInOut"
      }}
      className="flex items-center justify-center w-full min-h-screen bg-neutral-900">
      <div className="flex flex-col max-w-4xl gap-10 py-40 mx-auto">
        {features.map((feature) => (
          <Card key={feature.title} feature={feature} />
        ))}
      </div>
    </motion.div>
  );
};

const Card = ({ feature }: { feature: Feature }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const translateContent = useSpring(
    useTransform(scrollYProgress, [0, 1], [130, -300]),
    {
      stiffness: 100,
      damping: 30,
      mass: 1,
    }
  );
  const opcaityContent = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const blur = useTransform(scrollYProgress, [0.5, 1], [0, 10]);
  const scale = useTransform(scrollYProgress, [0.5, 1], [1, 0.6]);

  return (
    <div
      ref={ref}
      key={feature.title}
      className="grid grid-cols-2 gap-20 py-40"
    >

      <motion.div
        className="flex flex-col justify-center gap-5"
        style={{
          filter: useMotionTemplate`blur(${blur}px)`,
          scale: scale,
        }}
      >
        {feature.icon}
        <h2 className="text-4xl font-bold text-white">
          {feature.title}
        </h2>
        <p className="text-lg text-neutral-400">
          {feature.description}
        </p>
      </motion.div>

      <motion.div
        style={{
          y: translateContent,
          opacity: opcaityContent,
        }}
      >
        {feature.content}
      </motion.div>
    </div>
  );
}

export default MotionHookExample;
