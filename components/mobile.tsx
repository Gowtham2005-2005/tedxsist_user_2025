import React, { useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { motion, useInView } from 'framer-motion';
const TEDxSections = () => {
    const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: false,
    margin: "-100px",
  });

  const titleVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1, ease: [0.4, 0, 0.2, 1] },
    },
  };

  
  const sections = [
    {
      title: "What is TEDx?",
      description: "In the spirit of discovering and spreading ideas, TED has created a program called TEDx. TEDx is a program of local, self-organized events that bring people together to share a TED-like experience. Our event is called TEDxSIST, where x = independently organized TED event. At our TEDxSIST event, TED Talks video and live speakers will combine to spark deep discussion and connection in a small group.",
      image: "/bg.png?height=400&width=600",
    },
    {
      title: "Theme: Resilience",
      description: "At TEDxSIST 2025, we believe in the power of resilience—the ability to adapt, persevere and emerge stronger through challenges. This year's theme, 'Resilience: Exploring the Human Experiences' highlights the inspiring stories of people who have overcome difficulties and shaped their own futures.",
      image: "/bg.png?height=400&width=600",
    },
    {
      title: "Our Vision & Impact",
      description: "TEDxSIST is not just about hosting an event—it's about inspiring lasting change. Since its inception, TEDxSIST has become a platform for sharing transformative ideas that drive change in the community. Through thought-provoking talks, collaborations, and shared experiences, TEDxSIST aims to foster a space where innovation, resilience, and action are nurtured.",
      image: "/bg.png?height=400&width=600",
    },
    
    {
      title: "Why Attend TEDxSIST",
      description: "Joining us where we run you through experiences of resilience filled with inspiration will connect passionate individuals. Imagine being part of a global community, where every conversation and every talk has the potential to ignite action and change – not just in your own life, but in the world around you.",
      image: "/bg.png?height=400&width=600",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
        <div ref={containerRef} className="py-10 flex flex-col items-center justify-center gap-1">
      <div className="text-center space-y-4">
        <motion.h1
          className="text-5xl font-bold text-foreground leading-tight"
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          viewport={{ once: false, amount: 0.5 }}
        >
          Experience <span className="text-primary">TEDx</span>SIST
        </motion.h1>

      </div>
    </div>
      <div className="space-y-8">
        {sections.map((section, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                {/* Content Section */}
                <div className="p-6 md:w-1/2">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    <span className="text-red-600">{section.title}</span>
                  </h2>
                  <div className="md:w-1/2 h-48 md:h-auto relative mb-4">
                  <Image
                    src={section.image}
                    alt={`${section.title} illustration`}
                    fill
                    className="object-cover"
                  />
                </div>
                  <p className="text-gray-200">{section.description}</p>
                  <div className="mt-4 h-1 w-24 bg-red-600 rounded-full" />
                </div>
                
                {/* Image Section */}
                
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TEDxSections;