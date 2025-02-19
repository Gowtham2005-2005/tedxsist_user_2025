import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";

const TimelineEntry = ({ 
  title, 
  content, 
  images
}: { 
  title: string;
  content: {
    heading: string;
    headingHighlight: string;
    description: string;
  };
  images?: {
    src: string;
    alt: string;
  }[];
}) => {
  const [imageError, setImageError] = useState<{[key: string]: boolean}>({});

  const handleImageError = (src: string) => {
    setImageError(prev => ({...prev, [src]: true}));
    console.error(`Failed to load image: ${src}`);
  };
  return (
    <div className="flex justify-start pt-10 md:pt-40 md:gap-10">
      <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
        <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full flex items-center justify-center">
          <div className="h-4 w-4 rounded-full bg-neutral-800 border border-neutral-700 p-2" />
        </div>
        <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 0.8,
          ease: [0.25, 0.1, 0, 1]
        }}
      >
        <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500">
          {title}
        </h3></motion.div>
      </div>

      <div className="relative pl-20 pr-4 md:pl-4 w-full">
         <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2,
          delay: 0.8,
          ease: [0.25, 0.1, 0, 1]
        }}
      >
        <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500">
          {title}
        </h3>
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          
          transition={{
            duration: 1.2,
            delay: 0.8,
            ease: [0.25, 0.1, 0, 1],
          }}
          className="text-2xl md:text-3xl font-bold text-gray-100 mb-4"
        >
          <span className="text-primary">{content.headingHighlight}</span>
          {content.heading}
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.8,
            ease: [0.25, 0.1, 0, 1],
          }}
          className="text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl mb-8"
        >
          {content.description}
        </motion.p>

        {images && (
        <div className="grid grid-cols-1 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative w-full aspect-video">
              {!imageError[image.src] ? (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="rounded-lg object-cover shadow-lg"
                  onError={() => handleImageError(image.src)}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index === 0} // Load the first image with priority
                />
              ) : (
                <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">Image not available</span>
                </div>
              )}
            </div>
          ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const Timeline = () => {
  const timelineData = [
    {
      title: "Upcoming",
      content: {
        headingHighlight: "Resilience",
        heading: " – Exploring Human Experiences",
        description: "The upcoming TEDxSIST event will focus on resilience—the ability to overcome challenges and emerge stronger. This theme explores various aspects of resilience in human experiences, including personal growth, community solidarity, innovation, and creativity. Join us as we hear inspiring talks from individuals who embody resilience and share transformative ideas that drive change."
      }
    },
    {
      title: "2023",
      content: {
        headingHighlight: "Uncharted",
        heading: " Reality",
        description: "TEDxSIST 2023 explored new frontiers of human experience, from technological advancements to philosophical reflections on society. The event was a journey into uncharted territories of thought, offering a mix of futuristic concepts and practical insights."
      },
      images: [
        {
          src: "/unchartedreality1.jpg",
          alt: "TEDxSIST 2023 Event"
        },
        {
          src: "/unchartedreality2.jpg",
          alt: "TEDxSIST 2023 Speaker"
        },
        {
          src: "/unchartedreality3.jpg",
          alt: "TEDxSIST 2023 Speaker"
        }
      ]
    },
    {
      title: "2022",
      content: {
        headingHighlight: "Merging Minds:",
        heading: " League of Castaways",
        description: "TEDxSIST 2022 brought together brilliant minds who shared their diverse ideas, dreams, and innovations. The event was about finding strength in unity and collaboration, despite seemingly isolating challenges."
      },
      images: [
        {
          src: "/mergingminds1.png",
          alt: "TEDxSIST 2022 Event"
        },
        {
          src: "/mergingminds2.png",
          alt: "TEDxSIST 2022 Speaker"
        },
        {
          src: "/mergingminds3.png",
          alt: "TEDxSIST 2022 Speaker"
        },
        {
          src: "/mergingminds4.png",
          alt: "TEDxSIST 2022 Speaker"
        }
      ]
    }
  ];

  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };

    // Initial height calculation
    updateHeight();

    // Set up ResizeObserver
    resizeObserverRef.current = new ResizeObserver(updateHeight);
    if (ref.current) {
      resizeObserverRef.current.observe(ref.current);
    }

    // Clean up
    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full h-full bg-black">
      <div className="container max-w-screen-xl mx-auto px-4 md:px-8 py-24">
        <div className="max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.5,
              ease: [0.25, 0.1, 0, 1]
            }}
            className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight mt-12"
          >
            Where <span className="text-primary">Ideas</span> Take Flight
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.2,
              delay: 0.4,
              ease: [0.25, 0.1, 0, 1]
            }}
            className="text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl"
          >
            Step into a realm where innovation meets inspiration. Each TEDxSIST event crafts a unique story of breakthrough ideas and visionary minds coming together to shape tomorrow.
          </motion.p>
        </div>
      </div>
      
      <div className="w-full font-sans md:px-10" ref={containerRef}>
        <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
          {timelineData.map((item, index) => (
            <TimelineEntry
              key={index}
              {...item}
            />
          ))}
          <div
            style={{
              height: height + "px",
            }}
            className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-[#9B0000] via-[#EB0028] to-transparent from-[0%] via-[10%] rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;