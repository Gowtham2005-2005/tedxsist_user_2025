import { formatRelativeTime } from '@/lib/time-ago'

interface BlogSection {
  title: string;
  content: string;
}

interface BlogAuthor {
  name: string;
  avatar: string;
}

interface BlogBadge {
  icon: string;
  text: string;
}

interface BlogPost {
  image: string;
  badge: BlogBadge;
  className: string;
  title: string;
  author: BlogAuthor;
  description: string;
  timeAgo: string;
  sections: BlogSection[];
}

export const blogData: Record<string, BlogPost> = {
  'tedx-sist-2026-opportunity-in-the-unknown': {
    image: "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/ef0b544d85f652b9d9a3ca264d2ed7def1a2e102.jpg",
    badge: { icon: "🎯", text: "Featured" },
    className: "md:col-span-2",
    title: "TEDxSIST 2026: Opportunity in the Unknown",
    author: {
      name: "Neeharika and Team",
      avatar: "/placeholder.svg"
    },
    description: "TEDxSIST 2026 invites us to look beyond certainty and discover what becomes possible when we embrace the unfamiliar. With bold ideas, honest conversations, and future-facing perspectives, this edition explores how uncertainty can become a space for courage, creativity, and meaningful transformation.",
    timeAgo: formatRelativeTime(1749856812),
    sections: [
      {
        title: "Introduction",
        content: "There are moments in every journey when the path ahead is not fully visible. We do not always have complete answers, clear plans, or guaranteed outcomes. Yet it is often in these very moments of uncertainty that new possibilities begin to take shape. TEDxSIST 2026 is built around that idea."
      },
      {
        title: "Opportunity in the Unknown",
        content: "This year's theme, Opportunity in the Unknown, invites us to look at uncertainty not as something to fear, but as something to explore. The unknown can feel uncomfortable because it asks us to move without complete assurance. It challenges us to trust curiosity, ask better questions, and stay open to outcomes we may not yet understand. But it is also where imagination expands, courage is tested, and growth begins.\n\nAt TEDxSIST 2026, we want to create a space where ideas do more than inform. We want them to shift perspective. We want them to uncover possibilities hidden beneath routine thinking. We want them to remind us that not all meaningful progress begins with clarity—sometimes it begins with a willingness to step forward even when the future is still taking shape."
      },
      {
        title: "Building the Unmasked",
        content: "Our supporting idea for this edition, Building the Unmasked, deepens this theme. It speaks to what happens when people, systems, and communities begin to move beyond appearances and reveal what is real, unfinished, vulnerable, and full of potential. To build the unmasked is to create from a place of honesty. It means looking beyond polished surfaces and choosing authenticity, insight, and intention.\n\nThis year's edition is a call to thinkers, creators, dreamers, builders, and changemakers. It is for those who are willing to engage with uncertainty not as a limitation, but as an opening. Some of the most powerful ideas of our time were not born from certainty. They emerged from difficult questions, incomplete maps, and moments when someone decided that not knowing everything was not a reason to stop."
      },
      {
        title: "The Spirit of 2026",
        content: "TEDxSIST has always stood for ideas worth spreading, but every edition also carries a deeper emotional rhythm. The spirit of 2026 is one of possibility. We are interested in the ideas that appear when comfort zones are challenged. We are drawn to the voices that ask what more can be discovered, what assumptions need to be re-examined, and what futures can be built when we are brave enough to think differently.\n\nThis edition is not about pretending uncertainty is easy. It is about recognizing that uncertainty is real—and that within it, there is room for courage, innovation, empathy, and change. When we stop demanding immediate certainty from every step, we allow room for exploration. That is where fresh thinking begins."
      },
      {
        title: "An Invitation",
        content: "TEDxSIST 2026 will bring together stories and perspectives that reflect this energy. Through meaningful talks, conversations, and shared experiences, we hope to create a space where people leave not only inspired, but transformed in the way they see possibility. We want attendees to walk away with stronger questions, deeper clarity, and a renewed willingness to engage with what lies ahead.\n\nOpportunity does not always arrive with certainty. Sometimes it appears quietly, hidden inside complexity, discomfort, or transition. Sometimes it asks us to become more honest, more curious, and more courageous before it reveals its full shape. TEDxSIST 2026 is an invitation to meet that moment.\n\nAnd perhaps that is where the most important ideas begin—in the unknown, where what we choose to build next truly matters."
      }
    ]
  },
  'magic-in-quiet-moments-2026': {
    image: "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/29c2f092473e49afad8e0cbbdedf715e86722e6c.jpg",
    badge: { icon: "✨", text: "Behind the Scenes" },
    className: "md:col-span-1",
    title: "Magic in quiet moments: Behind the scenes journey",
    author: {
      name: "Aakriti Bose",
      avatar: "/placeholder.svg"
    },
    description: "Behind every TEDxSIST experience is a thoughtful process of building meaning through design, collaboration, and intention. This story follows the quieter moments behind TEDxSIST 2026 and how they shape an edition centered on possibility, reflection, and discovery.",
    timeAgo: formatRelativeTime(1749856812),
    sections: [
      {
        title: "Introduction",
        content: "When people think of a TEDx event, they often picture the stage, the speakers, the lights, and the applause. They think of the visible moments—the ones that are captured in photographs, remembered in quotes, and shared in conversations long after the event is over. But behind every visible moment is a quieter journey that gives it meaning."
      },
      {
        title: "The Process Behind 2026",
        content: "TEDxSIST 2026 is being shaped not only by big ideas, but also by small, intentional choices. Long before the audience arrives and long before a speaker steps onto the stage, an event like this begins in conversations, drafts, revisions, uncertainties, and moments of reflection. It is in these quieter spaces that the real texture of the experience is built.\n\nThis year's edition, Opportunity in the Unknown, has influenced not only what we say, but how we create. The theme asks us to explore the unfamiliar, and that spirit has guided the process behind the scenes as well. Every design decision, planning discussion, and content choice has been approached with one question in mind: how do we create an experience that feels honest, thoughtful, and deeply connected to the theme?"
      },
      {
        title: "Where the Magic Lives",
        content: "The answer is rarely found in noise. It is often found in the quiet moments.\n\nIt appears in the way a single sentence is rewritten until it feels true. It appears in the search for the right balance between clarity and emotion. It appears in the effort to create spaces that are not only visually appealing, but also meaningful in what they communicate. It appears in the care taken to make sure every detail, however small, contributes to a larger sense of purpose.\n\nBehind the scenes, TEDxSIST is not just an event being assembled. It is a vision being interpreted. Teams collaborate across different responsibilities, each bringing their own perspective into the process. There are discussions about tone, storytelling, flow, identity, timing, and impact. There are experiments, corrections, and moments when something unexpected opens up a better direction than the one originally planned."
      },
      {
        title: "Quiet Moments, Deep Intention",
        content: "That is part of what makes this journey special. It reflects the theme it is built around. Working toward something meaningful often requires stepping into spaces where the outcome is not fully defined at the start. Creativity does not always come with a map. Sometimes it emerges through patience, observation, and trust in the process.\n\nThe quiet moments are where this trust is built. They are the moments when a team pauses to ask whether something feels aligned. They are the late adjustments that no one may ever notice directly, but everyone will feel in the final experience. They are the choices that shape atmosphere, emotion, and connection. They may not be loud, but they are powerful.\n\nTEDxSIST 2026 is, in many ways, a celebration of those unseen efforts. It honors the invisible work that supports every visible result. It reminds us that what feels seamless on the surface is often the result of deep intention underneath."
      },
      {
        title: "Building with Depth",
        content: "As this edition continues to take shape, we carry forward the belief that meaning is not created only in grand gestures. It is often created in attentiveness, in collaboration, and in the willingness to care deeply about the details.\n\nThere is magic in quiet moments because they allow us to build with depth instead of speed. They allow us to listen before we declare, reflect before we finalize, and create with a stronger sense of purpose. In the journey toward TEDxSIST 2026, those moments matter more than ever.\n\nAnd when the stage lights finally come on, they will illuminate far more than a finished event. They will reveal the result of countless thoughtful moments that happened when no one was watching."
      }
    ]
  },
  'building-the-unmasked-voices-of-courage': {
    image: "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/eeec2569c702ceb327c54f5a32b1e034118d09de.jpg",
    badge: { icon: "🎯", text: "Featured" },
    className: "md:col-span-1",
    title: "Building the Unmasked: Voices of Courage from Our Community",
    author: {
      name: "Catherine Oviya",
      avatar: "/placeholder.svg"
    },
    description: "Some of the most powerful ideas emerge when people choose honesty over performance and curiosity over fear. This piece reflects on the voices, experiences, and community spirit that bring the TEDxSIST 2026 vision to life.",
    timeAgo: formatRelativeTime(1749856812),
    sections: [
      {
        title: "Introduction",
        content: "Every community carries stories that are not immediately visible. Behind familiar faces and everyday routines are experiences, questions, and convictions that often remain unspoken. Sometimes they stay hidden because they feel too personal. Sometimes they are overshadowed by expectation, performance, or the pressure to appear certain. But when those layers fall away, something powerful becomes possible.\n\nThat is the spirit behind Building the Unmasked, one of the central ideas shaping TEDxSIST 2026."
      },
      {
        title: "What It Means to Build the Unmasked",
        content: "To build the unmasked is to create from a place of honesty. It means making space for voices that do not rely on perfection to be meaningful. It means listening to perspectives that reveal struggle, insight, vulnerability, and growth without trying to polish them into something artificial. It is about recognizing that authenticity is not a weakness in ideas—it is often what gives them power.\n\nWithin every local community, there are people already living this truth. They are asking difficult questions, creating change in quiet ways, and choosing courage when easier paths are available. They may not always stand in the spotlight, but their stories carry the kind of depth that can move others toward reflection and action."
      },
      {
        title: "Honoring Those Voices",
        content: "TEDxSIST 2026 wants to honor those voices.\n\nThis edition is not only about innovation in the abstract. It is also about human honesty. It is about how people confront uncertainty, reshape identity, reimagine systems, and find purpose in places that once felt unclear. The unknown does not affect everyone in the same way, but many of us know what it means to move through transition, doubt, or reinvention. When those experiences are shared openly, they become more than personal stories—they become bridges.\n\nThe community around TEDxSIST is filled with such bridges. It includes people who have learned to build while still figuring things out. It includes those who have made room for change without waiting for perfect conditions. It includes voices that challenge comfortable narratives and invite deeper reflection."
      },
      {
        title: "Why This Theme Matters Now",
        content: "Building the unmasked is also about removing distance between ideas and lived reality. Sometimes the most moving insight is not the most polished one. It is the one that feels true. It is the one that names what others have felt but not yet articulated. It is the one that opens a window and says: this, too, deserves to be seen.\n\nThat is why this theme matters now. We live in a time when many people feel pressure to define themselves quickly, confidently, and visibly. Yet some of the most meaningful growth happens outside performance. It happens in uncertainty, in revision, in honesty, and in the courage to keep building without needing to appear finished."
      },
      {
        title: "An Invitation to Listen Deeply",
        content: "TEDxSIST 2026 embraces that space. It welcomes stories that are still becoming. It values ideas that come with complexity. It invites us to see that truth and transformation often emerge together.\n\nAs we prepare for this edition, we are reminded that community is not only built through shared celebration. It is also built through shared recognition. When one person speaks honestly, others often find language for their own experiences. When one story becomes visible, it creates permission for more stories to surface.\n\nThis is how ideas spread meaningfully—not only through scale, but through resonance.\n\nBuilding the Unmasked is an invitation to listen more deeply, speak more truthfully, and create more courageously. It calls on us to look beyond surfaces and pay attention to what is real, unfinished, and alive with possibility.\n\nAnd when we do, we may find that the most powerful voices in our community were never absent. They were simply waiting for a space where they could be heard."
      }
    ]
  },
  'tedxsist-2026-are-you-ready-to-step-into-the-unknown': {
    image: "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/336f72e12797263c6128e5539d0c518e7ad424ea.jpg",
    badge: { icon: "🎯", text: "Featured" },
    className: "md:col-span-2",
    title: "TEDxSIST 2026 Is Here: Are You Ready to Step Into the Unknown?",
    author: {
      name: "Catherine Oviya",
      avatar: "/placeholder.svg"
    },
    description: "TEDxSIST 2026 is more than an event—it is an invitation to engage with ideas that challenge comfort and open new paths of thought. Here is how to prepare, participate, and make the most of an edition built around opportunity, courage, and new perspectives.",
    timeAgo: formatRelativeTime(1749856812),
    sections: [
      {
        title: "A Moment Becomes an Experience",
        content: "There is something special about the moment an idea becomes an experience. What begins as a theme, a conversation, or a vision slowly transforms into something people can step into, feel, and carry with them. TEDxSIST 2026 is one of those moments.\n\nThis year, we invite you to be part of an edition shaped by curiosity, courage, and possibility. Opportunity in the Unknown is more than a theme for the stage. It is an invitation to rethink how we meet change, uncertainty, and new ideas in our own lives. It asks us not to wait for everything to feel certain before we begin engaging. Instead, it encourages us to enter the unfamiliar with attention, openness, and purpose."
      },
      {
        title: "How to Make the Most of It",
        content: "Attending TEDxSIST 2026 is not only about watching talks. It is about participating in a shared experience of thought and reflection. It is about being present in a space where different voices, disciplines, and stories meet. It is about allowing yourself to be challenged, surprised, and inspired.\n\nStart by arriving with curiosity. The strongest TEDx experiences often begin when we let go of the need to predict what we will take away. Some ideas will resonate immediately. Others may unfold slowly, returning to us later in conversation or reflection. The more open we are, the more room there is for something meaningful to shift.\n\nListen beyond the obvious. Every talk carries not only information, but intention. Pay attention to what ideas are asking of you. Are they challenging a belief you have held for a long time? Are they helping you see a problem differently? Are they opening a possibility you had not considered before?"
      },
      {
        title: "Engage, Reflect, Connect",
        content: "Engage with people, not just content. TEDxSIST is also about community. Some of the most memorable moments happen outside the formal talk itself—in discussions, reactions, shared questions, and unexpected connections. When people gather around ideas, they create new ones together.\n\nReflect as you experience. Take notes, capture phrases, or simply pause between sessions to process what you have heard. A TEDx event moves quickly, and reflection helps transform inspiration into something more lasting. Sometimes one sentence, heard at the right time, can shape an entirely new direction.\n\nBe willing to carry the experience forward. The value of an event does not end when it concludes. The real question is what continues afterward. Which ideas stay with you? Which perspectives influence your choices? Which conversations do you continue? TEDxSIST is not only about a day of talks—it is about the afterlife of thought."
      },
      {
        title: "What This Edition Asks of Us",
        content: "This edition is especially meaningful because of what it asks us to confront. The unknown is not always easy. It can feel uncertain, demanding, and unfinished. But it can also be the place where growth becomes visible. When we stop treating uncertainty as emptiness, we start recognizing it as a space full of hidden direction.\n\nTEDxSIST 2026 is built for that realization. It is a gathering for people who are ready to think deeply, listen generously, and imagine what becomes possible when we stop asking only for certainty and start making room for exploration."
      },
      {
        title: "It's TEDxSIST Time",
        content: "So yes, it is TEDxSIST time.\n\nAnd this year, more than ever, it is time to step into the unknown—not passively, but with courage, attention, and the willingness to be changed by what you encounter."
      }
    ]
  },
  
  
}

export type BlogDataType = typeof blogData;