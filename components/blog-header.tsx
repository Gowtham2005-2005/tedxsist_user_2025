"use client";

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react";

interface BlogHeaderProps {
  image: string
  badge: { icon: string; text: string }
  title: string
  author: { name: string; avatar: string }
  description: string
  timeAgo: string
}

export default function BlogHeader({ image, badge, title, author, description, timeAgo }: BlogHeaderProps) {
  const [expanded, setExpanded] = useState(false);
  const words = description.split(" ");
  const isLong = words.length > 15;
  const isExternal = image && image.startsWith("http");

  return (
    <div className="mb-10">
      {/* Hero image — full width with dark gradient overlay */}
      <div className="relative w-full aspect-video md:aspect-[24/10] lg:aspect-[21/7] overflow-hidden mb-6">
        {isExternal ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={image || "/bg.png"}
            alt={title}
            fill
            priority
            className="object-cover"
          />
        )}
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Badge + title + author overlaid at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <Badge variant="outline" className="rounded-full mb-3 border-white/40 text-white bg-white/10 backdrop-blur-sm">
            {badge.icon} {badge.text}
          </Badge>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight drop-shadow">
            {title}
          </h1>
          <div className="flex items-center gap-2">
            <Avatar className="h-7 w-7 border border-white/30">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback className="text-xs">{author.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-white/90 font-medium">{author.name}</span>
            <span className="text-white/50 text-xs">·</span>
            <span className="text-xs text-white/60">{timeAgo}</span>
          </div>
        </div>
      </div>

      {/* Description below hero */}
      <div className="px-4 md:px-8 lg:px-28">
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl">
          {isLong && !expanded ? words.slice(0, 15).join(" ") + "..." : description}{" "}
          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-primary font-medium inline"
            >
              {expanded ? "Read less" : "Read more"}
            </button>
          )}
        </p>
      </div>
    </div>
  );
}
