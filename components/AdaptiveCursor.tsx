"use client"

import React, { useEffect, useState } from "react"
import CustomCursor from "./CustomCursor"

const AdaptiveCursor = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [hideCursor, setHideCursor] = useState(false)

  useEffect(() => {
    // Detect if the device is touch-enabled
    const checkTouchDevice = () => {
      setIsTouchDevice(!window.matchMedia("(pointer: fine)").matches)
    }

    checkTouchDevice()
    window.addEventListener("resize", checkTouchDevice)

    return () => window.removeEventListener("resize", checkTouchDevice)
  }, [])

  useEffect(() => {
    const handleHover = (event: MouseEvent) => {
      if ((event.target as HTMLElement)?.closest(".video-preview-card")) {
        setHideCursor(true)
      } else {
        setHideCursor(false)
      }
    }

    window.addEventListener("mousemove", handleHover)
    return () => window.removeEventListener("mousemove", handleHover)
  }, [])

  // Hide cursor on touch devices or when hovering over a video preview
  if (isTouchDevice || hideCursor) return null

  return <CustomCursor isHidden={hideCursor} />
}

export default AdaptiveCursor
