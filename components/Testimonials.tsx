"use client";

import React, { useRef } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { motion, useInView } from "framer-motion";

export function InfiniteMovingCardsDemo() {
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

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20, rotateX: 15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.1 },
    },
  };

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div ref={containerRef} className="py-20 flex flex-col items-center justify-center gap-8">
      <div className="text-center space-y-4">
        <motion.h1
         whileInView="visible"
          className="text-4xl font-bold text-foreground text-center break-words"
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          viewport={{ once: false, amount: 0.5 }}
        >
          What Our <span className="text-primary">Attendees</span> Say
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground text-bold" 
          variants={subtitleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          Voices from <span className="text-primary">TEDx</span><span className="text-bold">SIST</span>
        </motion.p>
      </div>

     {/* Mobile view - Single Combined Testimonial */}
      <motion.div
        className="relative flex md:hidden w-full overflow-hidden"
        variants={cardContainerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="relative w-full perspective-1000" variants={cardVariants}>
          <div className="absolute left-0 top-0 z-10 h-full w-[100px] bg-gradient-to-r from-background to-transparent" />
          <div className="absolute right-0 top-0 z-10 h-full w-[100px] bg-gradient-to-l from-background to-transparent" />
          <InfiniteMovingCards
            items={[...leftTestimonials, ...centerTestimonials, ...rightTestimonials]} 
            direction="top"
            className="w-full"
          />
        </motion.div>
      </motion.div>

      {/* Desktop view */}
      <motion.div
        className="relative hidden md:flex gap-x-0 overflow-hidden"
        variants={cardContainerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {[leftTestimonials, centerTestimonials, rightTestimonials].map((items, index) => (
          <motion.div
            key={index}
            className="relative w-1/3 perspective-1000"
            variants={cardVariants}
          >
            <div className="absolute left-0 top-0 z-10 h-full w-[100px] bg-gradient-to-r from-background to-transparent" />
            <div className="absolute right-0 top-0 z-10 h-full w-[100px] bg-gradient-to-l from-background to-transparent" />
            <InfiniteMovingCards
              items={items}
              direction={index === 1 ? "bottom" : "top"}
              rowPosition={index === 0 ? "left" : index === 1 ? "center" : "right"}
              className="w-full"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

const leftTestimonials = [
  {
    quote: "The event was truly amazing, inspiring, and I personally enjoyed listening to the speakers sharing their experiences. Will definitely participate next year. Thank you for conducting a wonderful event.",
    photo: "/th.jpg",
    name: "Sanjana",
    title: "",
  },
  {
    quote: "The theme 'Uncharted Reality' was an amazing touch to TEDxSIST. Personally loved the view of this theme from different personalities.",
    photo: "/th.jpg",
    name: "Granap Blessy R",
    title: "",
  },
  {
    quote: "As this is my first time attending TEDx live, I was naturally anxious. The event was so good, motivating of course, and made me want to be unique, special, and notable in my life.",
    photo: "/th.jpg",
    name: "Divya R",
    title: "",
  },
];

const centerTestimonials = [
  {
    quote: "It felt surreal to be part of this TEDxSIST. It was so inspiring to be here and know the inspiring people’s journey.",
    photo: "/th.jpg",
    name: "Deekshitha",
    title: "",
  },
  {
    quote: "This event was really spectacular. I enjoyed it a lot. All the speaker’s words and ideas were really inspiring. The band’s performance was really good. I had a great time!!",
    photo: "/th.jpg",
    name: "Preethi",
    title: "",
  },
  {
    quote: "This is the second time attending this event. This event was organized well. Mostly, I liked the speech of the last two speakers. I have learned a lot from their way of speech.",
    photo: "/th.jpg",
    name: "Justin",
    title: "",
  },
];

const rightTestimonials = [
  {
    quote: "Very informative and well-organized event and definitely useful for career as well. Thank you for giving us a chance to attend this event.",
    photo: "/th.jpg",
    name: "Damesh & Surya",
    title: "",
  },
  {
    quote: "It was a wonderful experience to be able to present during this event and gain their valuable knowledge impacted upon me.",
    photo: "/th.jpg",
    name: "Kiransurya US",
    title: "",
  },
  {
    quote: "Very inspiring session! Really loved all the speakers, but Dr. Aiswarya stood out the most! Thank you so much for hosting such a meaningful session. Would love to be part of TEDxSIST.",
    photo: "/th.jpg",
    name: "Sonali",
    title: "",
  },
  {
    quote: "It was very inspiring and thought-provoking. Thank you for this opportunity.",
    photo: "/th.jpg",
    name: "S. Prisha",
    title: "",
  },
];
