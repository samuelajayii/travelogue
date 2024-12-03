import Image from "next/image";
import { motion, useInView, useMotionValueEvent, useScroll, useTransform, } from "motion/react"

export default function Home() {
  return (
    <div>
      <div className="home-bg" >
        <div className="relative text-center">
          <h1 className="text-3xl">Travelogue</h1>
          <h1>Share your journey, inspire the world </h1>
        </div>
      </div>

      <motion.div className="flex items-center justify-center gap-40 my-16">
        <h1 className="text-4xl">Travel the world <br></br> Take pictures</h1>

        <Image width={600} height={800} src="/home-tourist.avif" alt="Tourists"/>
        
      </motion.div>
    </div>

  );
}
