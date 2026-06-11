"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import { motion, useScroll } from "framer-motion";
import Image from "next/image";

interface Section {
  title: ReactNode;
  description: string;
  image: string;
}

export default function StickyScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);

  const sections: Section[] = [
    {
      title: <>What is <span className="text-primary">TEDx?</span></>,
      description: "In the spirit of discovering and spreading ideas, TED has created a program called TEDx. TEDx is a program of local, self-organized events that bring people together to share a TED-like experience. Our event is called TEDxSIST, where x = independently organized TED event. At our TEDxSIST event, TED Talks video and live speakers will combine to spark deep discussion and connection in a small group. The TED Conference provides general guidance for the TEDx program, but individual TEDx events, including ours, are self-organized.",
      image: "/bg.png?height=400&width=600",
    },
    {
      title: <>Our <span className="text-primary">Vision & Impact</span></>,
      description: "TEDxSIST is not just about hosting an event—it's about inspiring lasting change. Since its inception, TEDxSIST has become a platform for sharing transformative ideas that drive change in the community. Through thought-provoking talks, collaborations, and shared experiences, TEDxSIST aims to foster a space where innovation, resilience, and action are nurtured.",
      image: "/bg.png?height=400&width=600",
    },
    {
      title: <>Theme: <span className="text-primary">Resilience</span></>,
      description: "At TEDxSIST 2025, we believe in the power of resilience—the ability to adapt, persevere and emerge stronger through challenges. This year's theme, 'Resilience: Exploring the Human Experiences' highlights the inspiring stories of people who have overcome difficulties and shaped their own futures. Our speakers will share their powerful experience and ideas that encourage action, spark new thoughts and inspire curiosity in every listener.",
      image: "/bg.png?height=400&width=600",
    },
    {
      title: <>Why Attend<span className="text-primary"> TEDx</span>SIST</>,
      description: "Joining us where we run you through experiences of resilience filled with inspiration will connect passionate individuals. Imagine being part of a global community, where every conversation and every talk has the potential to ignite action and change – not just in your own life, but in the world around you. It's a fuel to your next big step towards making a difference.",
      image: "/bg.png?height=400&width=600",
    },
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const totalSections = sections.length;

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const newIndex = Math.floor(latest * totalSections);
      setActiveSection(Math.max(0, Math.min(newIndex, totalSections - 1)));
    });

    return () => unsubscribe();
  }, [scrollYProgress, totalSections]);

  return (
    <div ref={containerRef} className="h-[200vh] relative bg-black">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full relative px-12">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-4 ml-[10%] relative z-10">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{
                  opacity: activeSection === index ? 1 : 0,
                  x: activeSection === index ? 0 : -50,
                  filter: `blur(${activeSection === index ? 0 : 10}px)`,
                }}
                transition={{ duration: 0.5 }}
                className="max-w-xl absolute inset-12 flex flex-col justify-center"
              >
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-4xl font-bold mb-4 text-white"
                >
                  {section.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-gray-400"
                >
                  {section.description}
                </motion.p>
                <div className="mt-8 h-1 w-32 bg-[#EB0028] rounded-full" />
              </motion.div>
            ))}
          </div>

          {/* Right Images */}
          <div className="h-screen w-full flex justify-center items-center relative overflow-hidden">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.6, ease: "easeOut"  as const}}
              className="relative w-[400px] h-[300px] rounded-2xl overflow-hidden"
            >
              <Image
                src={sections[activeSection].image}
                alt={typeof sections[activeSection].title === 'string' 
                  ? sections[activeSection].title 
                  : 'TEDx Section Image'}
                fill
                className="object-cover object-center rounded-2xl"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent rounded-2xl" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
