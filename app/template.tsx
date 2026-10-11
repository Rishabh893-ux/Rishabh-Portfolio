"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * A template re-mounts on every navigation (unlike a layout), so each page fades
 * and rises in. Only opacity and y are animated: when y settles at 0 Framer clears
 * the transform, which keeps the fixed navbar inside the page working. Visitors
 * who prefer reduced motion get a plain fade.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0.2 : 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
