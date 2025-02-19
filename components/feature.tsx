import { cn } from "@/lib/utils";
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

export function FeaturesSectionDemo() {
      const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true });

  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  const features = [
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
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
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  
  index,
}: {
  title: string;
  description: string;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-800 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-800 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      
      <div className="text-lg font-bold mb-2 relative z-10 px-10 group-hover/feature:text-primary transition duration-200">
  <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-700 dark:bg-neutral-700 group-hover/feature:bg-[#EB0025] transition-all duration-200 origin-center" />
  <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block">
    {title}
  </span>
</div>

      <p className="text-sm text-neutral-300 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
