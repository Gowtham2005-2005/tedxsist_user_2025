"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  designation: string;
  src: string;
}

type TeamName = "Organisers" | "Curation Team" | "Finance Team" | "Operations Team" | "Production Team" | "Tech Team";

const teams: TeamName[] = [
  "Organisers",
  "Curation Team",
  "Finance Team",
  "Operations Team",
  "Production Team",
  "Tech Team",
];

const testimonialsByTeam: Record<TeamName, Testimonial[]> = {
  "Organisers": [
    {
      id: 1,
      quote: "Organizer Murali Sairam fosters TEDxSIST 2025’s community-driven spirit. With resilience and vision, he unites teams under a shared purpose, ensuring a collaborative, impactful event that celebrates ideas and meaningful conversations.",
      name: "M. Murali Sai Ram",
      designation: "Licensee and Organiser",
      src: "/sample.png",
    },
    {
      id: 2,
      quote: "Vice President of TEDxSIST 2025, Thaarni embraces challenges with her motto, \"Do it scared!\" Her resilience and leadership empower the team, pushing them beyond comfort zones to create a powerful, transformative TEDx experience.",
      name: "Thaarani",
      designation: "Co-Organiser",
      src: "/sample.png",
    },
    {
      id: 2,
      quote: "Mukesh, TEDxSIST 2025’s Cluster Coordinator, blends creativity with leadership. He expertly navigates communication across diverse teams, ensuring smooth coordination and an event that challenges boundaries, inspiring innovation and immersive storytelling.",
      name: "Mukesh.D.R",
      designation: "Cluster Coordinator",
      src: "/sample.png",
    },
  ],
  "Curation Team": [
    {
      id: 4,
      quote: "As Curation Lead, Safa crafts powerful narratives, shaping TEDxSIST 2025 to inspire and challenge perspectives. Through thematic flow and talk structure, she ensures an immersive experience that sparks curiosity and deep engagement.",
      name: "Safa",
      designation: "Curation Lead",
      src: "/sample.png",
    },
    {
      id: 5,
      quote: "Member of the Curation Team",
      name: "Janapriya S",
      designation: "Curation Team",
      src: "/sample.png",
    },
    {
      id: 6,
      quote: "Member of the Curation Team",
      name: "Prapti Ghosh",
      designation: "Curation Team",
      src: "/sample.png",
    },
    {
      id: 7,
      quote: "Member of the Curation Team",
      name: "Abhilasha Modak",
      designation: "Curation Team",
      src: "/sample.png",
    },
    
    {
      id: 8,
      quote: "Member of the Curation Team",
      name: "Dheeraj sv",
      designation: "Curation Team",
      src: "/sample.png",
    },
    {
      id: 9,
      quote: "Member of the Curation Team",
      name: "Aakriti Bose",
      designation: "Curation Team",
      src: "/sample.png",
    },
    {
      id: 10,
      quote: "Member of the Curation Team",
      name: "Catherine Oviya",
      designation: "Curation Team",
      src: "/sample.png",
    },
  ],
  "Finance Team": [
    {
      id: 11,
      quote: "As Finance and Marketing Lead, Sai Tejas masterfully balances budgeting and creative promotion. His strategic mindset and problem-solving skills drive impactful campaigns and partnerships, shaping TEDxSIST 2025 into an engaging and financially sound event.",
      name: "Sai Tejas S",
      designation: "Finance and Marketing Team",
      src: "/sample.png",
    },
    {
      id: 12,
      quote: "Member of the Finance and Marketing Team",
      name: "Neeharika Krishnan V",
      designation: "Finance and Marketing Team",
      src: "/sample.png",
    },
    {
      id: 13,
      quote: "Member of the Finance and Marketing Team",
      name: "Pradeep Vasan R",
      designation: "Finance and Marketing Team",
      src: "/sample.png",
    },
    {
      id: 14,
      quote: "Member of the Finance and Marketing Team",
      name: "Akul MS",
      designation: "Finance and Marketing Team",
      src: "/sample.png",
    },
  ],
  "Operations Team": [
    {
      id: 15,
      quote: "Shiney Beulah, the Logistics and Operations Lead, is a dynamic multitasker who thrives on collaboration and precision. With relentless dedication, she streamlines event logistics, ensuring TEDxSIST 2025 runs flawlessly while fostering teamwork and an inspiring, detail-oriented environment.",
      name: "Shiney Beulah J",
      designation: "Logistics and Operations Team",
      src: "/sample.png",
    },
    {
      id: 16,
      quote: "Member of the Logistics and Operations Team",
      name: "Arundhathi S",
      designation: "Logistics and Operations Team",
      src: "/sample.png",
    },
    {
      id: 17,
      quote: "Member of the Logistics and Operations Team",
      name: "C. Sai Varun",
      designation: "Logistics and Operations Team",
      src: "/sample.png",
    },
    {
      id: 18,
      quote: "Member of the Logistics and Operations Team",
      name: "S.Tabitha Juliana",
      designation: "Logistics and Operations Team",
      src: "/sample.png",
    },
    {
      id: 19,
      quote: "Member of the Logistics and Operations Team",
      name: "Narean Rajendran",
      designation: "Logistics and Operations Team",
      src: "/sample.png",
    },
  ],
  "Production Team": [
    {
      id: 20,
      quote: "Dhyani Stark, TEDxSIST 2025’s Production Lead, is a visionary force ensuring seamless execution. Known for his adaptability and sharp creative eye, he meticulously oversees every detail, blending ideation with precision to bring the event’s visual storytelling to life.",
      name: "Dhyaneshwar MD",
      designation: "Production Lead",
      src: "/sample.png",
    },
    {
      id: 21,
      quote: "Member of the Production Team",
      name: "Antony Joseph A",
      designation: "Production Team",
      src: "/sample.png",
    },
    {
      id: 22,
      quote: "Member of the Production Team",
      name: "Pa.Hariharan",
      designation: "Production Team",
      src: "/sample.png",
    },
    {
      id: 23,
      quote: "Member of the Production Team",
      name: "Naveen.V",
      designation: "Production Team",
      src: "/sample.png",
    },
  ],
  "Tech Team": [
    {
      id: 24,
      quote: "Tech Lead Gowtham is the problem-solver behind TEDxSIST 2025’s seamless execution. His expertise in troubleshooting, adaptability, and innovation ensures flawless live events, enhancing audience experiences with cutting-edge technology and meticulous planning.",
      name: "Gowtham S",
      designation: "Tech Team",
      src: "/sample.png",
    },
    
    {
      id: 25,
      quote: "Member of the Tech Team",
      name: "Hari Aravind A",
      designation: "Tech Team",
      src: "/sample.png",
    },
    {
      id: 26,
      quote: "Member of the Tech Team",
      name: "Hari Prashanth S",
      designation: "Tech Team",
      src: "/sample.png",
    },
    {
      id: 27,
      quote: "Member of the Tech Team",
      name: "Naveenraj K",
      designation: "Tech Team",
      src: "/sample.png",
    },
    {
      id: 28,
      quote: "Member of the Tech Team",
      name: "Hari Kesavan P",
      designation: "Tech Team",
      src: "/sample.png",
    },
    {
      id: 29,
      quote: "Member of the Tech Team",
      name: "Lohith Krishna JK",
      designation: "Tech Team",
      src: "/sample.png",
    },
    {
      id: 30,
      quote: "Member of the Tech Team",
      name: "K Hariom Subudhi",
      designation: "Tech Team",
      src: "/sample.png",
    },
  ],
};

interface Tab {
  title: TeamName;
  value: TeamName;
  content: React.ReactNode;
}

const tabs = teams.map((team) => ({
  title: team,
  value: team,
  content: <AnimatedTestimonials testimonials={testimonialsByTeam[team]} />,
}));

interface TabsProps {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}

const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: TabsProps) => {
  const [active, setActive] = useState(propTabs[0]);

  return (
    <>
      <div
        className={cn(
          "flex flex-row items-center gap-4 justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full",
          containerClassName
        )}
      >
        {propTabs.map((tab) => (
          <button
            key={tab.title}
            onClick={() => setActive(tab)}
            className={cn(
              "relative",
              tabClassName,
              // Apply active styles immediately through className
              active.value === tab.value && activeTabClassName
            )}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                initial={false}
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className="absolute inset-0 rounded-full"
              />
            )}
            <span className="relative block">
              {tab.title}
            </span>
          </button>
        ))}
      </div>
      
      <div className="relative mt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={cn(contentClassName)}
          >
            {active.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default function TeamSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="mt-0"
    >
      <h2 className="text-4xl font-bold mb-4 text-center">
        Our <span className="text-primary">Team</span>
      </h2>
      <Tabs
        tabs={tabs}
        containerClassName="flex justify-center mb-12"
        tabClassName="px-4 py-2 text-base font-medium rounded-full border border-transparent transition-all hover:border-primary"
        activeTabClassName="bg-primary text-white"
        contentClassName="w-full max-w-6xl mx-auto"
      />
    </motion.section>
  );
}

export { Tabs };
