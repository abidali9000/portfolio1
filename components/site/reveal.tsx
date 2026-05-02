"use client"

import { motion, type HTMLMotionProps } from "framer-motion"
import * as React from "react"

interface RevealProps extends HTMLMotionProps<"div"> {
  delay?: number
  y?: number
  once?: boolean
}

export function Reveal({ delay = 0, y = 16, once = true, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      viewport={{ once, margin: "-50px" }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
