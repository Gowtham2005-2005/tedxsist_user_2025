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
  'tedx-sist-2025': {
    image: "/bg.png",
    badge: { icon: "🎯", text: "Featured" },
    className: "md:col-span-2",
    title: "TEDxSIST 2025: Resilience",
    author: { 
      name: "Neeharika and Team", 
      avatar: "/logo.png" 
    },
    description: "Experience TEDxSIST 2025, where resilience meets innovation. Engage with thought-provoking talks, connect with visionary speakers, and expand your network in an inspiring environment that fosters creativity, transformation, and impactful ideas shaping the future.",
    timeAgo: formatRelativeTime(1739356812),
    sections: [
      { 
        title: "Introduction", 
        content: "Welcome to the TEDx community, where ideas go beyond limits and spark significant change. TEDx events celebrate innovation, storytelling, and human connection—uniting visionaries and change-makers worldwide. Here, curiosity flourishes, perspectives come together, and fresh possibilities arise. Whether you're looking for inspiration, questioning the norm, or envisioning the future, you're invited to uncover ideas that can transform our world." 
      },
      { 
        title: "The purpose of TEDx", 
        content: "At TED, the global mission focuses on discovering and sharing impactful, original ideas within local communities while amplifying them globally. This goal is achieved through organizing local events that highlight diverse perspectives and ignite meaningful discussions, effectively encapsulating the essence of TED's motto, \"ideas worth spreading\".\nAt TEDxSIST, we have cultivated that spark, elevating the expressions of essential concepts articulated by students, innovators, and thought leaders.\nThis year's TEDxSIST is poised to be our most exhilarating to date, providing a platform for the emergence of ideas that challenge conventional thinking." 
      },
      {
        title:"What is TEDx?",
        content: "TEDx is an independently organised TED event by local communities and they promote TED's mission of spreading ideas. x = independently organized event Members from a community obtain a license from TED to host their own TED events and speakers are invited to speak for 18 minutes or less. A TEDx event is centered around a theme and it fosters thinking, innovation and change. The goal of a TEDx event is to spark conversation, connection and community. Unlike larger conferences, TEDx events are focused and streamlined— there are no panels, breakout sessions, or multiple tracks—just a series of impactful talks that ignite curiosity and inspire action.\n\nThese TEDx events are then made globally available where they are shared to people all across the world in the TEDx official channel.\n\nTEDxSIST is one of the most eagerly awaited events on campus. TEDxSIST assembles visionary speakers, engaging audiences and fosters change both locally and globally."
      },
      {
        title:"A Glimpse",
        content:"TEDxSIST 2022: Merging Minds - The League of Castaways\nTEDxSIST 2022 fostered a unique space for diverse thinkers, highlighting humanity's complexity. The theme, Merging Minds: The League of Castaways, encouraged reflection on times we feel lost, akin to castaways navigating unique thoughts while seeking authenticity.\nThis theme echoed the journey of self-exploration, shifting from seeking external approval to valuing our mental health. The event recognized this vital change, moving from avoiding risks to embracing joy, laughter, memories, knowledge, and empathy.TEDxSIST 2022 also addressed societal issues: 'nerds' and 'cool' individuals create stereotypes that stifle idea expression. The event aimed to break these barriers, fostering an environment where vibrant minds connect, allowing each participant to be a hero in their story, and welcoming “mistakes” without fear."
      },
      {
        title:"TEDxSIST 2023: Exploring the Uncharted Reality",
        content:"TEDxSIST 2023 extended an invitation to attendees to engage in a profound journey of exploration, centered on the intellectually stimulating theme of \"Uncharted Reality.\" This theme encouraged participants to critically examine the prevailing norms, challenge established assumptions, and pursue novel frontiers in both their personal and collective endeavours. It served as a call to reflect on individual and societal narratives, empowering individuals to make informed decisions and to construct a more promising future through the prism of their historical experiences.\nThe event convened visionary speakers, each of whom presented innovative perspectives and motivating insights that expanded the boundaries of conventional thought and illuminated the previously uncharted dimensions of our collective reality.Broadening Horizons and Reimagining Opportunities\n\nThis year, we warmly invite you to embark on a journey that challenges the very limits of what is possible. Our theme, 'Resilience,' serves as a powerful impetus, encouraging you to rethink and expand upon all preconceived notions surrounding innovation and progress. We believe that by embracing resilience, we can unlock new paths of creativity and progress that transcend traditional boundaries.\"\n\nResilience isn\'t just about bouncing back from setbacks; it\'s about the amazing strength to adapt, grow, and truly thrive when faced with challenges. It\'s that inner power that helps us stay grounded and focused on our purpose, even during life\'s toughest moments.\n\nWe build resilience by embracing uncertainty, navigating through chaos, and coming out stronger after each experience. It\'s that unwavering belief that, no matter how intense the storm, we can turn our struggles into stepping stones towards a brighter, more empowered future."
      }
      
    ]
  },
  'magic-in-quiet-moments': {
    image: "/bg.png",
    badge: { icon: "✨", text: "Behind the Scenes" },
    title: "Magic in quiet moments: Behind the scenes journey",
    className: "md:col-span-1",
    author: { 
      name: "Aakriti Bose", 
      avatar: "/logo.png" 
    },
    description: "Delving into this year's theme and its significance. A deeper look at how we crafted meaningful experiences through thoughtful design and careful attention to detail.",
    timeAgo: formatRelativeTime(1739356812),
    sections: [
      { 
        title: "The Core of TEDx", 
        content: "TEDxSIST would not be possible without its student volunteers. The organising team have dedicated their time and effort to ensure that every single person enjoys the full experience of the TEDxSIST. From late-night planning meetings to securing world-class speakers, the TEDxSIST organizing committee has devoted extensive effort to deliver an event that encapsulates our collective zeal for innovation.Our organizing team comprises passionate students from various academic disciplines, united in their goal to create an event that authentically represents our campus spirit." 
      },
      { 
        title: "M. Murali Sai Ram:", 
        content: "“We aren't a club, we are a community” - these words perfectly echo Murali's people-centric ethos as the Organizer of TEDxSIST 2025. To Murali, leadership isn't about authority - but about fostering a sense of belonging and shared purpose. He sees his team not as individuals working under him but as collaborators united by a vision, seeking to embody excellence. By trusting the unique strengths of his team and navigating new challenges with his usual capable ease, Murali cultivates a cohesive and motivated community, each member invested in the shared goal of creating a memorable TEDxSIST 2025 experience. His reflective nature enables him to adapt to new challenges on the fly, learning from experience and employ unique strategies to enable TEDxSIST 2025 to become the magical hub of connection that he envisions." 
      },
      { 
        title: "Thaarni S:", 
        content: "\"Do it scared!\" – that is Thaarni's motto in all things that she does. As the Vice President for TEDxSIST and the co-licensee for TEDxSIST 2025, Thaarni exemplifies the true meaning of resilience. Her unwavering drive and competitive spirit fuel her determination to bring her vision of a magical TEDx event to life, no matter the obstacles in her way. She encourages her team to embrace discomfort, to step into the unknown, and to take on challenges even when they're uncertain. By pushing people to \"do it scared,\" she helps them discover new strengths, fostering a culture of growth and resilience. Thaarni's philosophy behind leadership isn't just merely about achieving goals; it's about teaching others the power of persistence through example." 
      },
      { 
        title: "Mukesh D R:", 
        content: "A rare mix of creative visionary and grounded team player, our Cluster Coordinator for TEDxSIST 2025 S. D. Mukesh pushes himself to be the best possible that he can be. His knack for crafting creative content and his purpose-driven mindset drive him as he organizes and manages communication across a diverse set of teams with diverse needs. He always puts the needs of his team-mates first, navigating challenges with his trademark flair for adaptability and problem-solving.His skill in balancing and juggling multiple teams, each with their own diverse needs and priorities, makes him an invaluable asset in inspiring TEDxSIST 2025 to be an event that forces people out of their comfort zone, and into an otherworldly space where anything is possible and every idea counts." 
      },
      { 
        title: "Safa:", 
        content: "As Curation Lead, Safa curates powerful ideas and narratives, ensuring TEDxSIST 2025 sparks curiosity and deep engagement. At the heart of the event, she meticulously shapes its narrative, weaving compelling stories that inspire and challenge perspectives. From selecting thought-provoking speakers to refining talk structures and maintaining thematic coherence, she ensures each element contributes to a seamless and immersive experience. Her dedication to human-centric storytelling pushes creative boundaries, making TEDxSIST 2025 not just an event but a platform for transformative discussions that leave a lasting impact." 
      },
      {
        title: "Shiney Beulah:",
        content:"Shiney Beulah is a proactive and enthusiastic multitasker who pushes herself to be the best she can be: all day, every day. As the Logistics and Operations Lead for TEDxSIST 2025, her reputation precedes her - her commitment to taking on a myriad of roles with her classic tireless dedication to her role means that no detail is unaccounted for. At every step of the way, Shiney seeks collaborative ideation - she draws her inspiration from listening to and actively engaging with diverse perspectives and constructive feedback to foster a strong team spirit. Under her worthy guidance, TEDxSIST 2025 will be a truly unforgettable experience, flowing together in mellifluous harmony."
      },
      {
        title: "Sai Tejas S:",
        content:"Meet Sai Tejas, our Finance and Marketing Lead, whose passion for strategy and sharp analytical mind make him an indispensable part of the TEDxSIST 2025 team.Sai wears many hats effortlessly balancing the intricacies of his role: whether he's brainstorming innovative marketing ideas, building partnerships, or handling budgeting. His knack for problem-solving and strategic thinking allows him to tackle challenges head-on while staying focused on delivering impactful results. His ability to combine meticulous planning with creative vision has been instrumental in shaping TEDxSIST 2025 into an extraordinary experience that celebrates innovation and adaptability."
      },
      {
        title: "Dhyani Stark:",
        content:"Meet our club's “Batman”: Dhyani Stark, the resilient force behind TEDxSIST 2025's production. Well-known for his adaptability, Dhyani faces each challenge head-on - or rather, camera-on. As the Production Lead, his role goes beyond merely overseeing logistics – Dhyani has a sharp eye for ideation and visualization, ensuring that every aspect of the event is in alignment with his creative vision.Dhyani's personal philosophy, “Jack of All Trades, Master of None,” reflects his belief in versatility - combined with his introspective and practical nature, it makes him an indispensable part of the design process. He leaves nothing to chance: he is a self-professed “dictator” when it comes to executing his creative vision. His hands-on approach ensures that no element of TEDxSIST will be left unaccounted for."
      },
      {
        title: "Gowtham:",
        content:"Meet Gowtham – the mastermind behind TEDxSIST's Tech Team! As the Lead, he's the unsung hero ensuring that the metaphorical wires behind the stage of TEDxSIST 2025 run smoothly and seamlessly. Gowtham's role extends far beyond technical expertise; his ability to troubleshoot, adapt, and anticipate issues before they arise is key to maintaining the flawless execution of every event. He thrives in the fast-paced environment of live events, managing everything from sound and visuals to intricate setups that enhance the audience experience. Whether it's incorporating new software or adapting to brand-new technical hurdles, Gowtham's design-thinking approach allows him to approach problems from creative angles, always finding a way to keep things running. His passion for technology and innovation is evident in every decision he makes, continuously elevating TEDxSIST to new heights."
      }
    ]
  },
  'a-story-of-the-grit-and-sweat-behind-resilience-a-case-study-of-our-local-community': {
    image: "/bg.png",
    badge: { icon: "🎯", text: "Featured" },
    className: "md:col-span-1",
    title: "A Story of The Grit and Sweat Behind Resilience: A Case Study Of Our Local Community",
    author: { 
      name: "Catherine Oviya", 
      avatar: "/logo.png" 
    },
    description: "Experience TEDxSIST 2025, where resilience meets innovation. Engage with thought-provoking talks, connect with visionary speakers, and expand your network in an inspiring environment that fosters creativity, transformation, and impactful ideas shaping the future.",
    timeAgo: formatRelativeTime(1739356812),
    sections: [
      { 
        title: "Introduction", 
        content: "Ah, the beach. The eternal rite of passage for every Chennai-dweller. Like all roads lead to Rome, all roads here in Chennai terminate right at the foot of the Bay of Bengal.We look upon the beach with eager eyes—it is, to many of us, a casual hangout spot where we make memories. We think of sunsets, rippling waves, and burying our toes in the sand as a way to relax.However, that is not the beach I wish to write about today.Today, I wish to write about the beach that existed on December 26, 2004, when the deadly Boxing Day tsunami ravaged the entire length of the Coromandel Coast. And most importantly, the beach that sprung out of the wreckage after." 
      },
      { 
        title: "The Tsunami", 
        content: "The 2004 Indian Ocean tsunami was one of the deadliest natural disasters in modern history, le aving a trail of devastation in its wake.It was triggered by a massive undersea earthquake off the coast of Indonesia, with waves towering up to 100 feet high.In Chennai and other affected regions, entire communities were obliterated within minutes—homes, schools, and livelihoods reduced to rubble.Thousands of lives were lost, and countless others were displaced, left to grapple with unimaginable grief and uncertainty. Entire fishing villages were destroyed.The survivors were left grappling with grief, homelessness, and uncertainty about their future.And yet.Look at where we are now—Chennai has sprung back to life, its beaches bustling and more vibrant than ever.How did we come back from such a deeply scarring event?" 
      },
      { 
        title: "The key word: Resilience.", 
        content: "The Fishing Communities of ChennaiThe hardest-hit groups were the fishing community. Entire villages were ripped apart—lives lost, equipment swallowed by the waves, and homes reduced to rubble.Holding so much grief in their hearts as their entire lives and futures were ripped from their grasp, they still fought.They banded together to share whatever resources remained, helping each other through the throes of their pain.The government reached out to assist them, providing funds, housing, and alternative methods of employment." 
      },
      { 
        title: "Community and Compassion", 
        content: "As stories of suffering and pain reverberated through local media and word of mouth, communities across the world ached in empathy.Local NGOs, religious institutions, and volunteer groups in Chennai played a pivotal role in recovery efforts.Organizations like the South Indian Federation of Fishermen Societies (SIFFS) collaborated with international agencies to provide aid.Schools and colleges organized volunteering efforts and fundraising campaigns. Medical camps dispensed critical aid, while relief camps worked tirelessly to provide food and clean drinking water to survivors." 
      },
      { 
        title: "How to Get Involved", 
        content: "Whether you're attending as a participant or want to contribute as a volunteer, TEDxSIST 2025 offers multiple ways to get involved. Engage with our online community, share your insights, and be part of a movement that promotes resilience and innovation." 
      }
    ]
  },
  'its-tedxsist-time-are-you-ready-to-make-the-most-of-it': {
    image: "/bg.png",
    badge: { icon: "🎯", text: "Featured" },
    className: "md:col-span-2",
    title: "It’s TEDx SIST Time! Are You Ready to Make the Most of It?",
    author: { 
      name: "Catherine Oviya", 
      avatar: "/logo.png" 
    },
    description: "Experience TEDxSIST 2025, where resilience meets innovation. Engage with thought-provoking talks, connect with visionary speakers, and expand your network in an inspiring environment that fosters creativity, transformation, and impactful ideas shaping the future.",
    timeAgo: formatRelativeTime(1739356812),
    sections: [
      { 
        title: "Introduction", 
        content: "TEDxSIST 2025 brings together innovative minds to explore the theme of resilience. This year's event focuses on the power of human adaptability and growth through challenges. The conference will highlight inspiring stories and groundbreaking ideas that redefine perseverance in a rapidly changing world." 
      },
      { 
        title: "Event Highlights", 
        content: "Join us for a day filled with compelling talks, interactive sessions, and networking opportunities. Our carefully curated speaker lineup features industry leaders, innovators, and changemakers who have navigated personal and professional obstacles to emerge stronger and more influential than ever." 
      },
      { 
        title: "What to Expect", 
        content: "Attendees will be immersed in thought-provoking presentations, gain valuable insights from expert speakers, and engage in meaningful discussions. From panel discussions to live Q&A sessions, every moment is designed to spark curiosity and ignite conversations that lead to action." 
      },
      { 
        title: "Behind the Scenes", 
        content: "Bringing TEDxSIST 2025 to life required months of planning and dedication. Our team has worked tirelessly to ensure every detail, from speaker curation to stage design, creates an atmosphere of learning and inspiration. Get an exclusive look at how this event came together." 
      },
      { 
        title: "How to Get Involved", 
        content: "Whether you're attending as a participant or want to contribute as a volunteer, TEDxSIST 2025 offers multiple ways to get involved. Engage with our online community, share your insights, and be part of a movement that promotes resilience and innovation." 
      }
    ]
  },
}

export type BlogDataType = typeof blogData;