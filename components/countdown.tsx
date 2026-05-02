"use client";

import React, { useEffect, useRef, useState } from "react";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import { motion, useInView } from "framer-motion";

const App = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1024); // Default to desktop for SSR
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    setIsMounted(true);
    // Set initial window width
    setWindowWidth(window.innerWidth);

    // Add window resize listener
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive size calculations
  const getResponsiveSizes = () => {
    if (windowWidth < 640) { // Mobile
      return {
        digitBlock: {
          width: 35,
          height: 45,
          fontSize: 25
        },
        label: 12,
        separator: 8
      };
    } else if (windowWidth < 768) { // Small tablets
      return {
        digitBlock: {
          width: 45,
          height: 55,
          fontSize: 35
        },
        label: 14,
        separator: 10
      };
    } else if (windowWidth < 1024) { // Tablets/Small laptops
      return {
        digitBlock: {
          width: 60,
          height: 70,
          fontSize: 45
        },
        label: 16,
        separator: 15
      };
    } else { // Desktop
      return {
        digitBlock: {
          width: 80,
          height: 90,
          fontSize: 55
        },
        label: 20,
        separator: 20
      };
    }
  };

  const sizes = getResponsiveSizes();

  return (
    <div className="flex flex-col items-center justify-center bg-black text-white text-center mb-8 px-4">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.9 }}
        className="w-full flex flex-col items-center justify-center"
      >
        <p className="text-2xl mb-4">
          2026 Registration Open - Save the date{" "}
          <span className="text-primary font-bold">24th June 2026</span>
        </p>

        {isMounted && windowWidth > 0 && (
          <FlipClockCountdown
            to={new Date("2026-06-24T00:00:00").getTime()}
            labels={["Days", "Hours", "Minutes", "Seconds"]}
            labelStyle={{
              fontSize: `${sizes.label}px`,
              color: "#eb0028",
              fontWeight: "bold",
            }}
            digitBlockStyle={{
              width: `${sizes.digitBlock.width}px`,
              height: `${sizes.digitBlock.height}px`,
              fontSize: `${sizes.digitBlock.fontSize}px`,
              color: "#eb0028",
              background: "#E4E4E4",
              borderRadius: "8px",
            }}
            separatorStyle={{
              size: `${sizes.separator}px`,
              color: "#FFFFFF"
            }}
            duration={0.5}
            hideOnComplete={false}
          />
        )}
      </motion.div>
    </div>
  );
};

export default App;