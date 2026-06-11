"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";

interface Step {
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    title: "Curating Inspiring Themes",
    description:
      "Each event revolves around a thoughtfully chosen theme that encourages exploration, innovation, and fresh perspectives.",
  },
  {
    title: "Identifying Remarkable Speakers",
    description:
      "We bring together diverse individuals—visionaries, leaders, and innovators—who share compelling stories and ideas worth spreading.",
  },
  {
    title: "Organizing a World-Class Event",
    description:
      "With meticulous planning, we create an immersive experience, blending talks, performances, and networking opportunities for our audience.",
  },
  {
    title: "Engaging the Community",
    description:
      "TEDxSIST fosters a vibrant community of students, professionals, and changemakers who actively participate in spreading impactful ideas.",
  },
  {
    title: "Expanding the Reach",
    description:
      "Talks are recorded and shared on global platforms, ensuring our ideas resonate with audiences far beyond the event day.",
  },
];

interface TimelineItemProps {
  step: Step;
  index: number;
  isOdd: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ step, index, isOdd }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);

  // Run animations only after client hydration
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const isCardInView = useInView(cardRef, { once: false, amount: 0.6 });
  const isMarkerInView = useInView(markerRef, { once: false, amount: 0.8 });

  const cardVariants: Variants = {
    hidden: { opacity: 0, x: isOdd ? 60 : -60, y: 30 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 18,
        mass: 0.8,
        delay: index * 0.1,
      },
    },
  };

  const markerVariants: Variants = {
    hidden: { scale: 0.3, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20,
        mass: 0.7,
        delay: index * 0.1,
      },
    },
  };

  return (
    <div className={`flex mb-16 items-center ${isOdd ? "flex-row-reverse" : "flex-row"}`}>
      <div className={`w-5/12 ${isOdd ? "pl-12 text-left" : "pr-12 text-right"}`}>
        <motion.div
          ref={cardRef}
          variants={cardVariants}
          initial="hidden"
          animate={isHydrated && isCardInView ? "visible" : "hidden"}
          whileHover={{ scale: 1.02 }}
          className="bg-card p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500"
          suppressHydrationWarning
        >
          <h3 className="text-xl font-bold text-primary mb-3">{step.title}</h3>
          <p className="text-gray-300">{step.description}</p>
        </motion.div>
      </div>

      <div className="w-2/12 flex justify-center">
        <motion.div
          ref={markerRef}
          variants={markerVariants}
          initial="hidden"
          animate={isHydrated && isMarkerInView ? "visible" : "hidden"}
          className="w-6 h-6 bg-primary rounded-full border-4 border-gray-900 z-10"
          suppressHydrationWarning
        />
      </div>

      <div className="w-5/12" />
    </div>
  );
};

export default function HowTEDxWorks() {
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true });

  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="max-w-6xl mx-auto px-4 py-16 border-b  border-gray-700 pb-12"
    >
      <motion.h2
        ref={titleRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isHydrated && isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20 }}
        className="text-4xl font-bold text-center mb-16"
        suppressHydrationWarning
      >
        How <span className="text-primary">TEDx</span>SIST Works
      </motion.h2>

      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary opacity-30" />

        {steps.map((step, index) => (
          <TimelineItem key={index} step={step} index={index} isOdd={index % 2 !== 0} />
        ))}
      </div>
    </motion.section>
  );
}
