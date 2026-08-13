"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Network, Cpu, GitBranch } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

const projects = [
  {
    icon: Network,
    title: "Cortex City",
    description:
      "A traffic simulation platform powered by GNN-LSTM neural networks. Integrates real-time APIs to model urban traffic flow, predict congestion, and optimize route planning using graph-based deep learning.",
    tags: ["Python", "GNN-LSTM", "TensorFlow", "API Integration", "NetworkX"],
    github: "https://github.com/rahibladex",
    gradient: "from-emerald-500/20 to-cyan-500/20",
    accentColor: "emerald",
  },
  {
    icon: Cpu,
    title: "Neural Network & ML Models",
    description:
      "End-to-end machine learning pipeline configurations — from data preprocessing and feature engineering to model training, evaluation, and deployment-ready setups.",
    tags: ["Python", "PyTorch", "Scikit-learn", "Pandas", "NumPy"],
    github: "https://github.com/rahibladex",
    gradient: "from-cyan-500/20 to-emerald-500/20",
    accentColor: "cyan",
  },
  {
    icon: GitBranch,
    title: "GitHub CI/CD Profile Workflows",
    description:
      "Automated GitHub Actions pipelines for dynamic profile READMEs, automated testing, and deployment workflows — turning repositories into self-maintaining systems.",
    tags: ["GitHub Actions", "YAML", "Shell", "CI/CD", "Automation"],
    github: "https://github.com/rahibladex",
    gradient: "from-emerald-400/20 to-cyan-400/20",
    accentColor: "emerald",
  },
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
      ref={ref}
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute right-0 top-1/4 h-[400px] w-[400px] bg-gradient-to-l from-cyan-500/5 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-400">
            Featured Work
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Projects That{" "}
            <span className="gradient-text">Push Boundaries</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            From neural network simulations to automated DevOps — here&apos;s
            what I&apos;ve been building.
          </p>
        </motion.div>

        {/* Project Cards */}
        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="border-gradient glass group flex flex-col rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:glow-emerald"
            >
              {/* Card Header with gradient */}
              <div
                className={`relative flex h-48 items-center justify-center overflow-hidden rounded-t-2xl bg-gradient-to-br ${project.gradient}`}
              >
                {/* Grid overlay */}
                <div className="grid-pattern absolute inset-0" />
                {/* Icon */}
                <motion.div
                  className={`relative z-10 rounded-2xl p-5 ${
                    project.accentColor === "emerald"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-cyan-500/10 text-cyan-400"
                  }`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <project.icon className="h-10 w-10" />
                </motion.div>
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-3 text-xl font-bold text-white">
                  {project.title}
                </h3>
                <p className="mb-5 flex-1 text-sm leading-relaxed text-slate-400">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="mb-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-400 transition-colors hover:bg-emerald-500/10 hover:text-emerald-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
