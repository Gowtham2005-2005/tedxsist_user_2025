"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import AboutTED from "@/components/AboutTED"
import HowTEDxWorks from "@/components/HowTEDxWorks"
import PastSpeakers from "@/components/PastSpeakers"
import TeamSection from "@/components/TeamSection"
import { FeaturesSectionDemo } from "@/components/feature"
export default function AboutPage() {
  return (
    <div className="bg-black text-white min-h-screen pt-24 pb-16 px-2 sm:px-0.5 md:px-2 lg:px-16 xl:px-20">

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-8 md:px-16"
      >
        <div className="relative w-full lg:h-[60vh] lg:mb-20">
  <Image 
    src="/about.jpg" 
    alt="About TEDx" 
    height={1600}
    width={1200} 
    className="rounded-[1rem] object-cover lg:hidden"
    style={{ objectPosition: "50% 75%" }} // Crops the top part
  />
  
  <Image 
    src="/about.jpg" 
    alt="About TEDx" 
    layout="fill" 
    className="rounded-[2rem] object-cover hidden lg:block"
    style={{ objectPosition: "50% 75%" }} // Crops the top part
  />
</div>


        <AboutTED />
<div className="hidden lg:block">
  <HowTEDxWorks />
</div>
<div className="block lg:hidden">
  <FeaturesSectionDemo />
</div>



        <PastSpeakers />
        <TeamSection />
      </motion.div>
    </div>
  )
}

