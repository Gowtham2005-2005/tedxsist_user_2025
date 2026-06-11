'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { ArrowRight } from 'lucide-react';
import { blogData } from '@/lib/blogData';

export default function BlogBentoGrid() {
  const router = useRouter();
  const exploreMoreRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToExploreMore = () => {
    if (exploreMoreRef.current) {
      const navbarHeight = 80;
      const elementPosition = exploreMoreRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const blogEntries = Object.entries(blogData);

  return (
    <div className="max-w-5xl mx-auto px-4 py-32">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Featured Blog</h2>
        <BentoGrid className="md:auto-rows-[minmax(20rem,auto)] cursor-pointer">
          {blogEntries.length > 0 && (
            <BentoGridItem
              title={blogEntries[0][1].title}
              description={blogEntries[0][1].description}
              header={<BlogImage src={blogEntries[0][1].image} alt={blogEntries[0][1].title} />}
              className="md:col-span-3"
              icon="Article"
              name={blogEntries[0][1].author.name}
              timeAgo={blogEntries[0][1].timeAgo}
              onClick={() => router.push(`/blogs/${blogEntries[0][0]}`)}
            />
          )}
        </BentoGrid>
      </div>

      <div className="mt-12" ref={exploreMoreRef}>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-3xl font-bold mb-2 text-foreground">Explore More</h2>
          <button
            className="flex items-center gap-2 text-neutral-100 hover:text-[#EB0028] transition-colors"
            onClick={handleScrollToExploreMore}
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <BentoGrid className="md:auto-rows-[minmax(20rem,auto)] cursor-pointer gap-4">
          {blogEntries.slice(1).map(([slug, blog], i) => (
            <BentoGridItem
              key={i}
              title={blog.title}
              description={blog.description}
              header={<BlogImage src={blog.image} alt={blog.title} />}
              className={`${blog.className} min-h-[20rem] transition-all duration-300 ${
                blog.description.length > 100 ? 'md:min-h-[24rem]' : ''
              }`}
              icon={blog.badge.text}
              name={blog.author.name}
              timeAgo={blog.timeAgo}
              onClick={() => router.push(`/blogs/${slug}`)}
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
}

/** Card thumbnail — shows the real image if available, falls back to the dot skeleton */
const BlogImage = ({ src, alt }: { src: string; alt: string }) => {
  const isReal = src && src !== '/placeholder.svg';
  if (isReal) {
    return (
      <div className="relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
    );
  }
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] border border-white/[0.2] bg-black" />
  );
};
