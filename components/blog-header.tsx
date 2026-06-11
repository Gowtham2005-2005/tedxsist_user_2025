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
  return (
    <div className="mb-8">
      <div className="relative w-full aspect-video md:aspect-[24/10] lg:aspect-[21/7] mb-6">
        <Image 
          src={image || "/bg.png"} 
          alt={title} 
          fill 
          priority
          className="object-cover" 
        />
      </div>
      <div className="px-4 md:px-8 lg:px-28">
        <Badge variant="outline" className="rounded-full mb-2">
          {badge.icon} {badge.text}
        </Badge>
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>
        <div className="flex items-center mb-4">
          <Avatar className="mr-3 h-10 w-10">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name[0]}</AvatarFallback>
          </Avatar>
          <span className="font-medium text-lg">{author.name}</span>
        </div>
        <p className="text-muted-foreground mb-4 text-lg max-w-3xl">
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
        <p className="text-sm text-muted-foreground">{timeAgo}</p>
      </div>
    </div>
  )
}

