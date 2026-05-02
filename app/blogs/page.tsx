'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { ArrowRight } from 'lucide-react';
import { blogData } from '@/lib/blogData';
import Image from 'next/image';

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
              header={<div className="relative w-full h-48 md:h-full min-h-[12rem]">
                <Image src={blogEntries[0][1].image} alt={blogEntries[0][1].title} fill className="object-cover rounded-xl" />
              </div>}
              className="md:col-span-3"
              icon="Article"
              name={blogEntries[0][1].author.name}
              avatarSrc={blogEntries[0][1].author.avatar}
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
              header={<div className="relative w-full h-48 min-h-[10rem]">
                <Image src={blog.image} alt={blog.title} fill className="object-cover rounded-xl" />
              </div>}
              className={`${blog.className} min-h-[20rem] transition-all duration-300 ${
                blog.description.length > 100 ? 'md:min-h-[24rem]' : ''
              }`}
              icon={blog.badge.text}
              name={blog.author.name}
              avatarSrc={blog.author.avatar}
              timeAgo={blog.timeAgo}
              onClick={() => router.push(`/blogs/${slug}`)}
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
}


