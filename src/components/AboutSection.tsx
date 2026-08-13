"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Shield, Code, Zap } from "lucide-react";

const highlights = [
  {
    icon: Brain,
    title: "AI / ML Focus",
    description:
      "Specializing in Neural Networks, GNN-LSTM models, and building intelligent data pipelines.",
  },
  {
    icon: Shield,
    title: "Disciplined Leader",
    description:
      "Active Cadet Corps member — leadership, teamwork, and discipline forged through competitive training.",
  },
  {
    icon: Code,
    title: "Full-Stack Builder",
    description:
      "Proficient in Python, Java, C++, with hands-on experience in Linux, WSL, and CI/CD automation.",
  },
  {
    icon: Zap,
    title: "Fast Learner",
    description:
      "Constantly evolving — from traffic simulations to automated workflows, always shipping real projects.",
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 bg-gradient-to-b from-emerald-500/5 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-400">
            About Me
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Engineering Intelligence,{" "}
            <span className="gradient-text">One Model at a Time</span>
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <p className="mb-6 text-lg leading-relaxed text-slate-400">
              I&apos;m{" "}
              <span className="font-semibold text-white">Rahul Jangra</span>, a
              second-year BCA student specializing in{" "}
              <span className="text-emerald-400">
                Artificial Intelligence & Machine Learning
              </span>{" "}
              at St. Agnes College, Mangaluru. My journey bridges the
              computational rigor of neural networks with the leadership
              discipline from my Cadet Corps training.
            </p>
            <p className="mb-6 text-lg leading-relaxed text-slate-400">
              From building{" "}
              <span className="text-cyan-400">
                GNN-LSTM traffic simulation models
              </span>{" "}
              to automating GitHub workflows with CI/CD pipelines, I focus on
              creating systems that solve real problems. My schooling at Army
              Public School, Chennai, instilled a sense of precision and
              resilience that I bring to every project.
            </p>
            <p className="text-lg leading-relaxed text-slate-400">
              When I&apos;m not training models, you&apos;ll find me exploring
              Linux internals, contributing to open source, or drilling with my
              Cadet Corps unit — always pushing boundaries.
            </p>
          </motion.div>

          {/* Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="glass group rounded-2xl p-6 transition-all duration-300 hover:glow-emerald"
              >
                <div className="mb-4 inline-flex rounded-xl bg-emerald-500/10 p-3 text-emerald-400 transition-colors group-hover:bg-emerald-500/20">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-sm font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
