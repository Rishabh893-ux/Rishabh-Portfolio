"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

export default function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
  ...rest
}: {
  delay?: number;
  y?: number;
} & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
