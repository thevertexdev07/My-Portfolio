"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Programming Languages",
    accent: "emerald",
    skills: [
      { name: "Python", level: 90 },
      { name: "Java", level: 75 },
      { name: "C++", level: 70 },
      { name: "JavaScript", level: 65 },
      { name: "TypeScript", level: 60 },
      { name: "Shell / Bash", level: 70 },
    ],
  },
  {
    title: "AI / ML Frameworks",
    accent: "cyan",
    skills: [
      { name: "TensorFlow", level: 80 },
      { name: "PyTorch", level: 75 },
      { name: "Scikit-learn", level: 85 },
      { name: "Pandas", level: 90 },
      { name: "NumPy", level: 90 },
      { name: "NetworkX", level: 70 },
    ],
  },
  {
    title: "Tools & Platforms",
    accent: "emerald",
    skills: [
      { name: "Linux / WSL", level: 85 },
      { name: "Git & GitHub", level: 90 },
      { name: "GitHub Actions", level: 80 },
      { name: "Docker", level: 60 },
      { name: "VS Code", level: 90 },
      { name: "Jupyter", level: 85 },
    ],
  },
];

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      ref={ref}
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute left-0 top-1/3 h-[400px] w-[400px] bg-gradient-to-r from-emerald-500/5 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-400">
            Tech Stack
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Skills &{" "}
            <span className="gradient-text">Technologies</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            The tools and technologies I use to bring ideas to life.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * catIdx }}
              className="glass rounded-2xl p-6"
            >
              {/* Category Header */}
              <div className="mb-6 flex items-center gap-3">
                <div
                  className={`h-1.5 w-8 rounded-full ${
                    category.accent === "emerald"
                      ? "bg-gradient-to-r from-emerald-400 to-emerald-600"
                      : "bg-gradient-to-r from-cyan-400 to-cyan-600"
                  }`}
                />
                <h3 className="text-lg font-bold text-white">
                  {category.title}
                </h3>
              </div>

              {/* Skill Items */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.15 * catIdx + 0.06 * skillIdx,
                    }}
                  >
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-300">
                        {skill.name}
                      </span>
                      <span className="text-xs text-slate-600">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={
                          isInView ? { width: `${skill.level}%` } : { width: 0 }
                        }
                        transition={{
                          duration: 2.5,
                          delay: 0.4 + 0.15 * catIdx + 0.1 * skillIdx,
                          ease: [0.22, 1, 0.36, 1], // Custom ultra-smooth ease curve
                        }}
                        className={`h-full rounded-full ${
                          category.accent === "emerald"
                            ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                            : "bg-gradient-to-r from-cyan-500 to-cyan-400"
                        }`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
