"use client";
import React, { useRef } from 'react';
import CustomCursor from "@/components/CustomCursor";
import { motion, useInView } from 'framer-motion';
import { useState, useEffect } from "react";
import Image from "next/image";
import { InfiniteMovingCardsDemo } from "@/components/Testimonials";
import { FAQ2 } from "@/components/FAQ";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import HeroScrollDemo from "@/components/hero-section";
import StickyScroll from "@/components/StickyScroll";
import StatisticsSection from "@/components/stats";
import App from "@/components/countdown";
import VideoPreviewCard from "@/components/video-card-preview";
import { VideoData, getVideoDetails, formatTimeAgo, formatDuration } from "@/lib/youtube";
import TEDxSections from '@/components/mobile';

const VIDEO_LINKS = [
  "https://www.youtube.com/watch?v=9HLDt9HhDzk",
  "https://www.youtube.com/watch?v=SVbkpaC29Sw",
  "https://www.youtube.com/watch?v=_dP5MA8VhxQ",
  "https://www.youtube.com/watch?v=BRs2no1qcaI",
  "https://www.youtube.com/watch?v=lfTcuVjjDw4"
];

const MAIN_VIDEO_DESCRIPTION = `Discover the transformative power of embracing life's uncertainties with an unwavering spirit, and learn how to conquer the unknown with a mindset built on strength and hope. Neerja Malik, a compassionate professional with over two decades of experience as both a Social Worker and Teacher. Neerja's values of Love, Faith, and Gratitude have not only aided her in overcoming cancer but have also inspired countless others. She continues to extend her impact through public speaking, authorship, and charitable initiatives, including the recent launch of a charitable cycle ride organized by Sankalp Beautiful World, furthering her commitment to cancer eradication and inspiring many along the way.

Beyond being a survivor, Neerja proudly identifies as a conqueror. She founded the Apollo Cancer Support Group and the Pollachi Cancer Support Group, exemplifying her commitment to making a difference. She was selected for the Department of State, USA's inaugural IVLP in Breast Cancer, gaining insights into various aspects of breast cancer across six major cities and participating in the renowned "Race for the Cure" event. This talk was given at a TEDx event using the TED conference format but independently organized by a local community. Learn more at https://www.ted.com/tedx`;

export default function HomePage() {
   const [cursorHidden, setCursorHidden] = useState(false);
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [mainVideo, setMainVideo] = useState<VideoData | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videoIds = VIDEO_LINKS.map(link => {
          const url = new URL(link);
          return url.searchParams.get('v');
        });

        const videoData = await Promise.all(
          videoIds.map(async (id, index) => {
            if (!id) throw new Error(`Invalid video ID at index ${index}`);
            const data = await getVideoDetails(id);
            return {
              id,
              category: "INSPIRATION",
              title: data.snippet.title,
              description: index === 4 ? MAIN_VIDEO_DESCRIPTION : data.snippet.description,
              author: data.snippet.channelTitle,
              plays: data.statistics.viewCount,
              timeAgo: formatTimeAgo(data.snippet.publishedAt),
              duration: formatDuration(data.contentDetails.duration),
              thumbnail: data.snippet.thumbnails.maxres?.url || data.snippet.thumbnails.high.url
            };
          })
        );

        setMainVideo(videoData[4]);
        setVideos(videoData.slice(0, 4));
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchVideos();
  }, []);

 

  const renderContent = () => (
    <main className="min-h-screen">
       <CustomCursor  isHidden={cursorHidden} />
      <HeroScrollDemo />
      <App />
      <ContainerScroll
        titleComponent={
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 1 , ease: [0.25, 0.4, 0.25, 1]}} // Move delay inside transition
            className="w-full flex justify-center"
          >
            
            <h1 className="text-4xl font-semibold text-foreground dark:text-foreground">
              Glimpses <span className="text-primary">Of</span> <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                <span className="text-primary">TEDx</span>SIST
              </span>
            </h1>
          </motion.div>
        }
      >
        <Image
          src="/aboutheader.png"
          alt="Glimpses of TEDxSIST"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>

      <StatisticsSection />

      <div className="pb-14">
        <div className="hidden lg:block">
        <StickyScroll />
      </div>

      {/* TEDxSections for medium and small screens */}
      <div className="block lg:hidden">
        <TEDxSections />
      </div>
        <div className="min-h-screen bg-background text-white ">
          <VideoArchivesSection />
          <div className="max-w-[1440px] mx-auto px-4  ">
            <div className="space-y-12">
              {mainVideo && (
                <VideoPreviewCard
                  isMain
                  category="INSPIRATION"
                  title={mainVideo.title}
                  description={mainVideo.description}
                  author={mainVideo.author}
                  plays={`${Math.floor(parseInt(mainVideo.plays) / 1000)}K`}
                  timeAgo={mainVideo.timeAgo}
                  duration={mainVideo.duration}
                  thumbnail={mainVideo.thumbnail}
                  videoId={mainVideo.id}
                  setCursorHidden={setCursorHidden}
                />
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {videos.map((video, index) => (
                  <div 
                    key={video.id} 
                    className={`border-gray-700 ${
                      index < videos.length - 1 ? 'border-b lg:border-b-0 lg:border-r lg:h-[90%]' : ''
                    } pb-14 lg:pr-6`}
                  >
                    <VideoPreviewCard
                      category="INSPIRATION"
                      title={video.title}
                      author={video.author}
                      plays={`${Math.floor(parseInt(video.plays) / 1000)}K`}
                      timeAgo={video.timeAgo}
                      duration={video.duration}
                      thumbnail={video.thumbnail}
                      videoId={video.id}
                      setCursorHidden={setCursorHidden}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <InfiniteMovingCardsDemo />
      <FAQ2 />
    </main>
  );

  if (!isMounted) return null;

  return !mainVideo ? renderContent() : renderContent();
}

const VideoArchivesSection = () => {
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

  return (
    <div ref={containerRef} className="py-20 flex flex-col items-center justify-center gap-8">
      <div className="text-center space-y-4">
        <motion.h1
          className="text-5xl font-bold text-foreground"
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          viewport={{ once: false, amount: 0.5 }}
        >
          Video <span className="text-primary">Archives</span>
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground text-bold"
          variants={subtitleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          Journey through our <span className="text-primary">TEDx</span><span className="text-bold">SIST</span> talks
        </motion.p>
      </div>
    </div>
  );
};