"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const cursorVariants = {
  default: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
   border: "1px solid hsl(var(--border))",
    transition: { type: "spring", stiffness: 500, damping: 28 },
  },
  hover: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    border: "1px solid hsl(var(--border))",
    transition: { type: "spring", stiffness: 500, damping: 28 },
  },
  hidden: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
}

export default function CustomCursor({ isHidden = false }: { isHidden?: boolean }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isTouchDevice, setIsTouchDevice] = useState(true) // Default true for SSR
  const [isMounted, setIsMounted] = useState(false)
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "hidden">("default")

  useEffect(() => {
    setIsMounted(true)
    const checkTouch = () => {
      setIsTouchDevice(!window.matchMedia("(pointer: fine)").matches)
    }

    checkTouch()
    window.addEventListener("resize", checkTouch)

    return () => window.removeEventListener("resize", checkTouch)
  }, [])

  useEffect(() => {
    if (isTouchDevice || isHidden) {
      setCursorVariant("hidden")
      return
    }

    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const mouseEnter = (e: Event) => {
      const target = e.target as HTMLElement | null
      if (target && target.closest && target.closest("button, a, [role='button']")) {
        setCursorVariant("hover")
      }
    }

    const mouseLeave = () => setCursorVariant("default")

    window.addEventListener("mousemove", mouseMove)
    document.addEventListener("mouseenter", mouseEnter, true)
    document.addEventListener("mouseleave", mouseLeave, true)

    return () => {
      window.removeEventListener("mousemove", mouseMove)
      document.removeEventListener("mouseenter", mouseEnter, true)
      document.removeEventListener("mouseleave", mouseLeave, true)
    }
  }, [isTouchDevice, isHidden])

  if (!isMounted || isTouchDevice) return null

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-50 mix-blend-difference"
      animate={cursorVariant}
      variants={cursorVariants}
      style={{
        left: mousePosition.x - 16,
        top: mousePosition.y - 16,
        position: "fixed",
        pointerEvents: "none",
      }}
    />
  )
}
