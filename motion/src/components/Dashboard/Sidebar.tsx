"use client";
import {
  ChartBarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { motion, stagger } from "motion/react";
import { useState } from "react";

const links = [
  {
    name: "Home",
    href: "/",
    icon: <HomeIcon />,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: <ChartBarIcon />,
  },
  {
    name: "Users",
    href: "/users",
    icon: <UserIcon />,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: <Cog6ToothIcon />,
  },
];
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const sidebarVariant = {
    open: {
      width: "16rem",
    },
    closed: {
      width: "4.5rem",
    },
  };

  const childVariants = {
    open: {
      opacity: 1,
      y: 0,
    },
    closed: {
      opacity: 0,
      y: -10,
    },
  };

  const parentvariants = {
    open: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.07,
        staggerDirection: -1,
      },
    },
  };

  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      exit="closed"
      transition={{
        duration: 0.3,
      }}
      className="h-full border-r border-neutral-100"
    >
      <motion.nav
        variants={sidebarVariant}
        className="h-full bg-white shadow-md"
      >
        <div className="flex items-center justify-between gap-2 p-4">
          <h2 className={`text-xl font-semibold ${!isOpen && "sr-only"}`}>
            Dashboard
          </h2>

          {/* Toggle Button */}
          <button
            onClick={() => setIsOpen((x) => !x)}
            className="cursor-pointer rounded-full bg-white p-2 shadow-md hover:bg-gray-100 focus:outline-none"
            aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isOpen ? (
              <ChevronLeftIcon className="w-6 cursor-pointer" />
            ) : (
              <ChevronRightIcon className="w-6 cursor-pointer" />
            )}
          </button>
        </div>

        <div className="relative">
          {/* Sidebar Content */}
          <nav className="p-4">
            <motion.ul variants={parentvariants} className="space-y-2">
              {links.map((link) => (
                <motion.li variants={childVariants} key={link.name}>
                  <a
                    href={link.href}
                    className="flex items-center gap-2 rounded p-2 text-gray-700 hover:bg-gray-200"
                    title={!isOpen ? link.name : ""}
                  >
                    {
                      <span className={`${isOpen ? "w-6" : "w-4"}`}>
                        {link.icon}
                      </span>
                    }
                    {isOpen && link.name}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </nav>
        </div>
      </motion.nav>
    </motion.div>
  );
};

export default Sidebar;
