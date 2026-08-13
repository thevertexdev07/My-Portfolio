"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, School, Award } from "lucide-react";

const timelineEvents = [
  {
    year: "2022 – 2023",
    title: "Army Public School, Chennai",
    subtitle: "10th Standard — CBSE",
    description:
      "Built a strong academic foundation with discipline, teamwork, and precision ingrained through the Army school ecosystem. Began exploring programming fundamentals.",
    icon: School,
    badge: "Foundation",
    current: false,
  },
  {
    year: "2024 – 2025",
    title: "Army Public School, Chennai",
    subtitle: "12th Standard — CBSE (Science Stream)",
    description:
      "Deepened interest in computer science and mathematics. Active Cadet Corps member — competed in drills, leadership events, and built discipline that carries into engineering work today.",
    icon: Award,
    badge: "Cadet Corps",
    current: false,
  },
  {
    year: "2025 – Present",
    title: "St. Agnes College, Mangaluru",
    subtitle: "BCA — AI & Machine Learning (2nd Year)",
    description:
      "Currently specializing in neural networks, GNN-LSTM models, and ML pipelines. Building real-world projects like Cortex City while mastering Python, Java, and DevOps tooling.",
    icon: GraduationCap,
    badge: "Current",
    current: true,
  },
];

export default function TimelineSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="timeline"
      ref={ref}
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* Background accent */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-cyan-500/3 to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-400">
            Education
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            My <span className="gradient-text">Journey</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px sm:left-1/2 sm:-translate-x-px">
            <motion.div
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : { height: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full w-full bg-gradient-to-b from-emerald-500/50 via-cyan-500/30 to-transparent"
            />
          </div>

          {/* Events */}
          <div className="space-y-12">
            {timelineEvents.map((event, i) => {
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={event.title + event.year}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
                  className={`relative flex flex-col gap-4 pl-20 sm:flex-row sm:gap-8 sm:pl-0 ${
                    isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Content Card */}
                  <div
                    className={`flex-1 ${isLeft ? "sm:text-right" : "sm:text-left"}`}
                  >
                    <div
                      className={`glass inline-block rounded-2xl p-6 transition-all duration-300 hover:glow-emerald ${
                        event.current ? "border-gradient" : ""
                      }`}
                    >
                      {/* Badge */}
                      <span
                        className={`mb-3 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                          event.current
                            ? "bg-emerald-500/15 text-emerald-400"
                            : "bg-white/5 text-slate-500"
                        }`}
                      >
                        {event.badge}
                      </span>
                      <p className="mb-1 text-sm font-medium text-emerald-400">
                        {event.year}
                      </p>
                      <h3 className="mb-1 text-lg font-bold text-white">
                        {event.title}
                      </h3>
                      <p className="mb-3 text-sm font-medium text-cyan-400">
                        {event.subtitle}
                      </p>
                      <p className="text-sm leading-relaxed text-slate-500">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="absolute left-8 -translate-x-1/2 sm:static sm:flex sm:translate-x-0 sm:items-start sm:justify-center sm:pt-6">
                    <div className="relative">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          event.current
                            ? "bg-emerald-500 text-dark-900"
                            : "glass text-emerald-400"
                        }`}
                      >
                        <event.icon className="h-5 w-5" />
                      </div>
                      {event.current && (
                        <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/30" />
                      )}
                    </div>
                  </div>

                  {/* Spacer for alignment */}
                  <div className="hidden flex-1 sm:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
