"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={`inline-block ${className ?? ""}`}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  );
}
