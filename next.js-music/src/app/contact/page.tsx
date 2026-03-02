"use client";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { useRef } from "react";

const page = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };
  return (
    <div className='min-h-screen w-full flex justify-center items-center overflow-hidden bg-[#0d1117]'>
      <div className='relative z-10 w-[90%] md:max-w-2xl flex justify-center items-center flex-col'>
        <h2 className='text-8xl font-medium text-white mb-2'>Contact Us</h2>
        <p className='text-gray-600 text-sm w-full text-center my-6 md:w-4/5'>
          We&apos;re here to help with any questions about our courses,
          programs, or events. Reach out and let us know how we can assist you
          in your musical journey.
        </p>
        <form className='flex flex-col justify-center items-center gap-4 w-full'>
          <input
            type="email"
            className='w-full border border-gray-800 bg-black placeholder:text-gray-600 rounded-lg font-medium focus:bg-black text-white pl-4 py-4'
            placeholder='Your email address'
          />
          <textarea
            ref={textareaRef}
            rows={1}
            onChange={autoResize}
            className='w-full min-h-40 resize-none overflow-hidden border border-gray-800 bg-black placeholder:text-gray-600 rounded-lg font-medium focus:bg-black text-white pl-4 py-4'
            placeholder='Your message'
          />
          <button type='submit' className='bg-cyan-500 self-start text-white font-medium hover:bg-cyan-300 transition cursor-pointer px-8 py-3 rounded-lg'>Send Message</button>
        </form>
      </div>
      <BackgroundBeams />
    </div>
  )
}

export default page
