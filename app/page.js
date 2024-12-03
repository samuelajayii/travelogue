"use client"
import Image from "next/image";
import { motion, useInView, useMotionValueEvent, useScroll, useTransform, } from "motion/react"
import { useRef } from "react";

export default function Home() {

  const ref = useRef(null);

  // useInView hook to detect when the element is in view
  const isInView = useInView(ref);

  const ref2 = useRef(null);

  const isInView2 = useInView(ref2);

  return (
    <div>
      <div className="home-bg" >
        <div className="relative text-center">
          <h1 className="text-3xl">Travelogue</h1>
          <h1>Share your journey, inspire the world </h1>
        </div>
      </div>

      <motion.div className="flex flex-col lg:flex-row items-center justify-center gap-40 my-16"
        ref={ref}
        initial={{ opacity: 0, y: 100 }} // Initial hidden state
        animate={isInView ? { opacity: 1, y: 0 } : {}} // Animate when in view
        transition={{ duration: 0.7, ease: "easeOut" }} // Smooth transition
      >
        <h1 className="text-4xl lg:w-[20vw]">Travel the world <br></br> Take pictures</h1>

        <Image width={600} height={800} src="/home-tourist.avif" alt="Tourists" />

      </motion.div>

      <hr></hr>

      <motion.div className="flex flex-col lg:flex-row-reverse items-center justify-center gap-40 my-20"
        ref={ref2}
        initial={{ opacity: 0, y: 100 }} // Initial hidden state
        animate={isInView2 ? { opacity: 1, y: 0 } : {}} // Animate when in view
        transition={{ duration: 0.7, ease: "easeOut" }} // Smooth transition
      >
        <h1 className="text-4xl lg:w-[20vw] text-center">Share your experience with us <br></br> In our blog</h1>

        <Image width={600} height={800} src="/writing.webp" alt="Tourists" />

      </motion.div>
    </div>

  );
}
