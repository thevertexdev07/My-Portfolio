"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function FloatingShape({
  className,
  delay = 0,
}: {
  className: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`absolute rounded-full opacity-20 blur-xl ${className}`}
      animate={{
        y: [0, -20, 10, -15, 0],
        x: [0, 10, -5, 15, 0],
        scale: [1, 1.1, 0.95, 1.05, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="hero-mesh grid-pattern relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Floating Background Shapes */}
      <FloatingShape
        className="left-[10%] top-[20%] h-72 w-72 bg-emerald-500/30"
        delay={0}
      />
      <FloatingShape
        className="right-[15%] top-[30%] h-56 w-56 bg-cyan-500/20"
        delay={2}
      />
      <FloatingShape
        className="bottom-[20%] left-[30%] h-48 w-48 bg-emerald-400/15"
        delay={4}
      />
      <FloatingShape
        className="bottom-[30%] right-[25%] h-36 w-36 bg-cyan-400/20"
        delay={1}
      />

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-sm text-emerald-400"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Open to opportunities
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          Rahul{" "}
          <span className="gradient-text text-glow-emerald">Jangra</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mx-auto mb-4 max-w-2xl text-xl font-medium text-slate-300 sm:text-2xl"
        >
          AI & Machine Learning Developer
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg"
        >
          2nd Year BCA in AI & ML at St. Agnes College, Mangaluru — building
          intelligent systems that shape the future.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.a
            href="#projects"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-3.5 text-sm font-semibold text-dark-900 shadow-lg shadow-emerald-500/20 transition-all hover:shadow-xl hover:shadow-emerald-500/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Explore Projects</span>
            <ArrowDown className="relative z-10 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.a>

          <motion.a
            href="https://github.com/rahibladex"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-700 px-8 py-3.5 text-sm font-semibold text-slate-300 transition-all hover:border-slate-500 hover:bg-white/5 hover:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <GithubIcon className="h-4 w-4" />
            GitHub Profile
          </motion.a>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent" />
    </section>
  );
}
