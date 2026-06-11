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
      description: "TEDxSIST is not just about hosting an event—it's about inspiring lasting change. Since its inception, TEDxSIST has become a platform for sharing transformative ideas that drive change in the community. Through thought-provoking talks, collaborations, and shared experiences, TEDxSIST aims to foster a space where innovation, creativity, and action are nurtured.",
      image: "/bg.png?height=400&width=600",
    },
    {
      title: <>Theme: <span className="text-primary">Opportunity in the Unknown</span></>,
      description: "In every uncertainty, there is a hidden opening to rethink, rebuild, and rediscover possibility. Opportunity in the Unknown invites us to step beyond predictability and engage with ideas that challenge what we assume. Building the Unmasked explores what happens when individuals, systems, and communities reveal their most honest potential. Through bold conversations and fresh perspectives, TEDxSIST 2026 aims to turn ambiguity into action. This edition celebrates courage, clarity, and the power of shaping the future before it fully reveals itself.",
      image: "/bg.png?height=400&width=600",
    },
    {
      title: <>Why Attend<span className="text-primary"> TEDx</span>SIST</>,
      description: "Join us for a journey of discovery and curiosity, where every talk sparks new connections and bold conversations. Imagine being part of a global community where every idea has the potential to ignite action and change — not just in your own life, but in the world around you. It's a catalyst for future-building and your next big step towards making a difference.",
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

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.4, 0, 0.2, 1] } },
  };

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
                {index === 2 ? (
                  <motion.h2
                    variants={titleVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.5 }}
                    className="text-4xl md:text-4xl font-bold mb-4 text-white"
                  >
                    {section.title}
                  </motion.h2>
                ) : (
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl md:text-4xl font-bold mb-4 text-white"
                  >
                    {section.title}
                  </motion.h2>
                )}
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
