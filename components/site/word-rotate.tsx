"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function WordRotate({
  words,
  duration = 2200,
  className,
}: {
  words: string[]
  duration?: number
  className?: string
}) {
  const [index, setIndex] = React.useState(0)
  React.useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % words.length), duration)
    return () => clearInterval(id)
  }, [duration, words.length])

  return (
    <span className={cn("relative inline-flex items-baseline", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
