"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

const navigationMenuTriggerStyle = cva(
  "relative group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-sm font-medium text-foreground",
  {
    variants: {
      isActive: {
        true: "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary",
        false: "after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all after:duration-300 after:ease-in-out"
      }
    },
    defaultVariants: {
      isActive: false
    }
  }
)

const FAQContext = React.createContext<{
  isFAQVisible: boolean;
  setIsFAQVisible: React.Dispatch<React.SetStateAction<boolean>>;
}>({ isFAQVisible: false, setIsFAQVisible: () => { } });

const Navbar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isFAQVisible, setIsFAQVisible] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const [isMounted, setIsMounted] = React.useState(false)
  const router = useRouter()
  const pathname = usePathname()

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/events", label: "Events" },
    { href: "/blogs", label: "Blogs" },
    { href: "/#faq-section", label: "FAQs" },
  ]

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    // Close mobile menu when path changes
    setIsOpen(false)
  }, [pathname])

  const scrollToFAQ = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (typeof window !== "undefined") {
      if (window.location.pathname !== "/") {
        window.location.href = "/#faq-section"
        return
      }
      const faqSection = document.getElementById("faq-section")
      if (faqSection) {
        const navHeight = 100
        const faqPosition = faqSection.offsetTop - navHeight
        window.scrollTo({
          top: faqPosition,
          behavior: "smooth",
        })
      }
    }
  }

  if (!isMounted) return null;

  return (
    <FAQContext.Provider value={{ isFAQVisible, setIsFAQVisible }}>
      <nav
  className={cn(
    "fixed top-4 left-1/2 z-50 transform -translate-x-1/2 w-11/12 max-w-7xl",
    // Change this condition to also apply the background when menu is open
    isScrolled || isOpen
      ? "top-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-7xl bg-background/30 backdrop-blur-lg rounded-2xl shadow-[0px_5px_18px_rgba(204,_204,_204,_0.1)] border border-transparent"
      : "bg-transparent shadow-none border-none border-brand-neutrals-900 "
  )}
>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="relative">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={120}
                  height={40}
                  className="object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/events">Events</NavLink>
              
              <BlogsMenu />
              
              <NavLink href="/#faq-section" onClick={scrollToFAQ}>FAQs</NavLink>
            </div>

            {/* Register Button - Desktop */}
            <div className="hidden md:flex">
              <HoverBorderGradient
                containerClassName="rounded-[var(--radius)]"
                as="button"
                className="flex items-center gap-2 px-4 py-2.5"
                onClick={() => router.push("/register")}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base font-medium leading-none">Register</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </HoverBorderGradient>
            </div>

            {/* Hamburger Menu */}
            <motion.button
              className="md:hidden flex items-center"
              onClick={() => setIsOpen(!isOpen)}
              animate={isOpen ? "open" : "closed"}
            >
              <svg width="23" height="23" viewBox="0 0 23 23">
                <motion.path
                  fill="transparent"
                  strokeWidth="3"
                  stroke="currentColor"
                  strokeLinecap="round"
                  variants={{
                    closed: { d: "M 2 2.5 L 20 2.5" },
                    open: { d: "M 3 16.5 L 17 2.5" },
                  }}
                />
                <motion.path
                  d="M 2 9.423 L 20 9.423"
                  fill="transparent"
                  strokeWidth="3"
                  stroke="currentColor"
                  strokeLinecap="round"
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                  transition={{ duration: 0.1 }}
                />
                <motion.path
                  fill="transparent"
                  strokeWidth="3"
                  stroke="currentColor"
                  strokeLinecap="round"
                  variants={{
                    closed: { d: "M 2 16.346 L 20 16.346" },
                    open: { d: "M 3 2.5 L 17 16.346" },
                  }}
                />
              </svg>
            </motion.button>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden"
              >
                <div className="px-2 pt-2 pb-3 space-y-1 ">
                  {navItems.map((item) => (
                    <motion.div
                      key={item.href}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        onClick={item.href === "/#faq-section" ? scrollToFAQ : undefined}
                        className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                      onClick={() => router.push("/register")}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      <span>Register</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </FAQContext.Provider>
  )
}

const NavLink = ({
  href,
  children,
  onClick,
}: {
  href: string
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}) => {
  const pathname = usePathname()
  const { isFAQVisible, setIsFAQVisible } = React.useContext(FAQContext)

  React.useEffect(() => {
    const checkFAQVisibility = () => {
      if (children === "FAQs" && pathname === "/") {
        const faqSection = document.getElementById('faq-section')
        if (faqSection) {
          const rect = faqSection.getBoundingClientRect()
          const viewportHeight = window.innerHeight
          const visibilityThreshold = viewportHeight * 0.7
          const sectionVisible = rect.height >= visibilityThreshold &&
            rect.top <= (viewportHeight * 0.3)
          setIsFAQVisible(sectionVisible)
        }
      }
    }

    if (pathname !== "/") {
      setIsFAQVisible(false)
    }

    window.addEventListener('scroll', checkFAQVisibility)
    checkFAQVisibility()
    return () => {
      window.removeEventListener('scroll', checkFAQVisibility)
    }
  }, [children, pathname, setIsFAQVisible])

  const isActive = children === "FAQs"
    ? isFAQVisible
    : children === "Home"
      ? pathname === "/" && !isFAQVisible
      : pathname === href

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative px-3 py-2 text-sm font-medium text-foreground hover:text-primary group",
        isActive && "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary"
      )}
    >
      <span className="relative z-10">{children}</span>
      {!isActive && (
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 ease-in-out" />
      )}
    </Link>
  )
}

const BlogsMenu = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname === "/blogs";
  const isSubPageActive = pathname.startsWith("/blogs/");

  return (
    <NavigationMenu>
      <NavigationMenuList className="bg-transparent">
        <NavigationMenuItem>
          <NavigationMenuTrigger
            onClick={() => router.push("/blogs")}
            className={cn(
              navigationMenuTriggerStyle({ isActive: isActive || isSubPageActive }),
              "bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent px-3 py-2",
              isActive || isSubPageActive ? "text-[#EB0028]" : "text-foreground hover:text-primary"
            )}
          >
            Blogs
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] bg-background/95 backdrop-blur-sm">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    href="/blogs/tedx-sist-2025"
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium text-foreground">
                      TEDxSIST 2025: Resilience
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Featured Blog
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/blogs/magic-in-quiet-moments" title="Magic in quiet moments: Behind the scenes journey">
                Behind the Scenes
              </ListItem>
              <ListItem href="/blogs/a-story-of-the-grit-and-sweat-behind-resilience-a-case-study-of-our-local-community" title="A Story of The Grit and Sweat Behind Resilience">
                A Case Study
              </ListItem>
              <ListItem href="/blogs/its-tedxsist-time-are-you-ready-to-make-the-most-of-it" title="It’s TEDx SIST Time! Are You Ready to Make the Most of It?">
                Experience TEDxSIST 2025
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};



const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a"> & { title: string }>(
  ({ className, title, children, href = "/", ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            href={href}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </Link>
        </NavigationMenuLink>
      </li>
    )
  }
)
ListItem.displayName = "ListItem"

export default Navbar