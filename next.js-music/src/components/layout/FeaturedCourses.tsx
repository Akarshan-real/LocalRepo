"use client"
import Link from "next/link";
import data from "../../data/music.json";
import { CourseType } from "@/types/course.type";
import { useMemo } from "react";
import { BackgroundGradient } from "../ui/background-gradient";

const FeaturedCourses = () => {
    const featuredCourses = useMemo(() =>
        data.courses.filter((course: CourseType) => course.isFeatured)
        , [data.courses]);

    return (
        <div className="py-12 bg-black/0.96">
            <div>

                <div className="text-center">
                    <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">
                        FEATURED COURSES
                    </h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                        Learn With the Best
                    </p>
                </div>

            </div>

            <div className="mt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                    {featuredCourses.map((course: CourseType) => (
                        <div key={course.id} className="flex justify-center">
                            <BackgroundGradient
                                className="flex flex-col rounded-[22px] bg-white dark:bg-zinc-900 overflow-hidden h-full max-w-sm"
                            >
                                <div className="p-4 sm:p-6 flex flex-col justify-between items-center text-center h-full">

                                    <h4 className="text-lg sm:text-xl text-black dark:text-neutral-200">
                                        {course.title}
                                    </h4>

                                    <p className="text-sm text-neutral-600 dark:text-neutral-400 my-4">
                                        {course.description}
                                    </p>

                                    <Link
                                        href={`/courses/${course.slug}`}
                                        className="text-blue-400 hover:text-blue-600 transition"
                                    >
                                        Learn More
                                    </Link>

                                </div>
                            </BackgroundGradient>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-20 text-center">
                <Link href={"/courses"}
                    className="px-4 py-2 rounded-lg font-bold outline outline-black text-white dark:text-black bg-black hover:bg-slate-900 dark:bg-white dark:hover:bg-gray-300
                    transition ease-in-out duration-200"
                >
                    View All Courses
                </Link>
            </div>
        </div>
    )
}

export default FeaturedCourses
