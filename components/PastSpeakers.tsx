"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

type Year =  2023 | 2022;
const years = [ 2023, 2022] as const;



const testimonials2023: Testimonial[] = [
  {
    quote: "Dr. Aishwarya is a skilled dermatologist at the Skin Health Foundation, Chennai. With an MBBS and MD from Sri Ramachandra Medical College, she specializes in Dermatology, Venereology, and Leprosy",
    name: "Dr. Aishwarya",
    designation: "Dermatologist at Skin Health Foundation, Chennai",
    src: "/aishwarya.png",
  },
  {
    quote: "Divya Abhishek is the youngest Chairperson of the Southern India Regional Council of The Institute of Cost Accountants of India and the youngest woman Independent Director/Trustee on the boards of listed companies.",
    name: "Divya Abhishek",
    designation: "Independent Director & Financial Expert",
    src: "/divyaabhishek.png",
  },
  {
    quote: "Kavitha Ramu, an accomplished IAS officer and CEO of the Chennai Metropolitan Development Authority, is driven by a passion for public service.",
    name: "Kavitha Ramu",
    designation: "IAS Officer & CEO, Chennai Metropolitan Development Authority",
    src: "/kavitharamu.png",
  },
  {
    quote: "Neerja Malik, a dedicated social worker and teacher with over 20 years of experience, is a true survivor and conqueror of cancer.",
    name: "Neerja Malik",
    designation: "Social Worker & Cancer Support Advocate",
    src: "/neerja.png",
  },
  {
    quote: "Mr. Sawan Kapoor launched his career in 2001 and quickly ascended the corporate ranks, becoming the CEO of Sutton & Maxwell, a part of The Palm Bay International Group—the largest wine and spirits import company in the U.S.—within just eight years.",
    name: "Sawan Kapoor",
    designation: "CEO, Sutton & Maxwell",
    src: "/sawankapoor.png",
  },
]

const testimonials2022: Testimonial[] = [
  {
    quote: "Ananya is a young author with a passion for sharing her unique perspective on life. A high school student with exceptional communication, leadership, and creativity, she's already published three books: 9 Chocolatey Bites, Dancing Kites, and Cloud Walker (at ages 10, 13, and 16).",
    name: "Ananya V Ganesh",
    designation: "Young Author & Speaker",
    src: "/ananya.png",
  },
  {
    quote: "T. J. Gnanavel is a talented Indian film director and writer, primarily known for his impactful work in the Tamil film industry.",
    name: "Gnanavel T. J",
    designation: "Film Director & Writer",
    src: "/gnanavel.png",
  },
  {
    quote: "Dr. Kannan Gireesh is a renowned psychiatrist and the Founder & CEO of Live Life Education Private Limited.",
    name: "Kannan Gireesh",
    designation: "Psychiatrist & CEO, Live Life Education",
    src: "/kannan.png",
  },
  {
    quote: "Maalica ArjunKrishnan, daughter of legendary director K.S. Ravikumar, began her career as a fashion designer but shifted paths after health challenges and postpartum depression.",
    name: "Maalica ArjunKrishnan",
    designation: "Mental Health Advocate",
    src: "/maalica.png",
  },
  {
    quote: "Sujith Kumar J is a dynamic 5-time TEDx speaker, passionate youth mentor, and accomplished writer.",
    name: "Sujith Kumar J",
    designation: "TEDx Speaker & Youth Mentor",
    src: "/sujith.png",
  },
  {
    quote: "Dr. Yamini Kannappan, MBBS, DPM, DNB, is a Consultant Psychiatrist at Kauvery Hospital, Chennai.",
    name: "Yamini Kannappan",
    designation: "Consultant Psychiatrist, Kauvery Hospital",
    src: "/yamini.png",
  },
]

const createYearContent = (year: Year) => {
  const testimonialsByYear: Record<Year, Testimonial[]> = {
    2023: testimonials2023,
    2022: testimonials2022,
  }
  return <AnimatedTestimonials testimonials={testimonialsByYear[year]} />
}

const tabs = years.map(year => ({
  title: year.toString(),
  value: year.toString(),
  content: createYearContent(year as Year)
}))

export default function PastSpeakers() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="mb-24 border-b border-gray-700 pb-12 pt-16"
    >
      <h2 className="text-4xl font-bold mb-4 text-center">Past <span className="text-primary">Speakers</span></h2>
      <Tabs
        tabs={tabs}
        containerClassName="flex justify-center mb-12"
        tabClassName="px-4 py-2 text-base font-medium rounded-full border border-transparent transition-all hover:border-primary"
        activeTabClassName="bg-primary text-white"
        contentClassName="w-full max-w-6xl mx-auto"
      />
    </motion.section>
  )
}

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode;
};

const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0]);

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
              // Add immediate background styling for active tab
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