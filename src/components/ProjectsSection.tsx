"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";
import {
  ExternalLink,
  Network,
  Cpu,
  Shield,
  GitBranch,
  Layers,
  Bot,
  Code,
  Sparkles,
  Star,
  GitFork,
  Search,
  RefreshCw,
  Clock,
  Radio,
  FolderGit2,
} from "lucide-react";
import { ProjectItem, ProjectCategory, ProjectsApiResponse } from "@/types/project";
import { FALLBACK_PROJECTS, GITHUB_USERNAME } from "@/lib/projects-data";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function getLanguageColor(language?: string | null): string {
  switch (language?.toLowerCase()) {
    case "python":
      return "#3572A5";
    case "typescript":
      return "#3178c6";
    case "javascript":
      return "#f7df1e";
    case "kotlin":
      return "#A97BFF";
    case "html":
      return "#e34c26";
    case "css":
      return "#563d7c";
    case "rust":
      return "#dea584";
    case "c++":
      return "#f34b7d";
    default:
      return "#10b981";
  }
}

function ProjectIconComponent({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case "Network":
      return <Network className={className} />;
    case "Cpu":
      return <Cpu className={className} />;
    case "Shield":
      return <Shield className={className} />;
    case "GitBranch":
      return <GitBranch className={className} />;
    case "Layers":
      return <Layers className={className} />;
    case "Bot":
      return <Bot className={className} />;
    case "Sparkles":
      return <Sparkles className={className} />;
    default:
      return <Code className={className} />;
  }
}

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [projects, setProjects] = useState<ProjectItem[]>(FALLBACK_PROJECTS);
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<"github" | "cache" | "fallback">("fallback");

  // Fetch repositories from API route
  const fetchProjects = async (isManual = false) => {
    try {
      if (isManual) setIsRefreshing(true);
      else setIsLoading(true);

      const res = await fetch("/api/github-projects", { cache: "no-store" });
      if (res.ok) {
        const data: ProjectsApiResponse = await res.json();
        if (data.projects && data.projects.length > 0) {
          setProjects(data.projects);
          setDataSource(data.source);
          setLastSyncTime(
            new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          );
        }
      }
    } catch (err) {
      console.warn("Could not sync live projects, keeping fallback data:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Filter projects based on category and search query
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "all" || project.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesSearch =
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        (project.language && project.language.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  const categories: { id: ProjectCategory; label: string; count: number }[] = [
    { id: "all", label: "All Projects", count: projects.length },
    {
      id: "ai-ml",
      label: "AI & Machine Learning",
      count: projects.filter((p) => p.category === "ai-ml").length,
    },
    {
      id: "web-apps",
      label: "Web Apps & Systems",
      count: projects.filter((p) => p.category === "web-apps").length,
    },
    {
      id: "tools",
      label: "Tools & Automation",
      count: projects.filter((p) => p.category === "tools").length,
    },
  ];

  return (
    <section
      id="projects"
      ref={ref}
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] bg-gradient-to-l from-cyan-500/5 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute left-0 bottom-1/4 h-[500px] w-[500px] bg-gradient-to-r from-emerald-500/5 to-transparent blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          {/* Live GitHub Sync Pill */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-950/40 px-3.5 py-1 text-xs font-medium text-emerald-400 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>Live GitHub Sync</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">
              {dataSource === "github"
                ? "Auto-updates on repo upload"
                : "Real-time sync enabled"}
            </span>
            {lastSyncTime && (
              <span className="hidden sm:inline text-[10px] text-slate-500">
                ({lastSyncTime})
              </span>
            )}
          </div>

          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Projects That{" "}
            <span className="gradient-text">Push Boundaries</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-slate-400">
            From neural network architectures to automated DevOps — every new
            repository uploaded to GitHub appears here automatically.
          </p>
        </motion.div>

        {/* Filter Controls & Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`group relative rounded-xl px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? "bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border border-emerald-500/40 shadow-lg shadow-emerald-500/10"
                    : "bg-white/[0.03] text-slate-400 border border-white/5 hover:bg-white/[0.06] hover:text-slate-200"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`ml-2 rounded-full px-1.5 py-0.5 text-[10px] ${
                    selectedCategory === cat.id
                      ? "bg-emerald-500/30 text-emerald-200"
                      : "bg-white/5 text-slate-500 group-hover:text-slate-300"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search & Manual Sync Controls */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-dark-800/80 pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 outline-none transition-colors focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50"
              />
            </div>

            {/* Sync Button */}
            <button
              onClick={() => fetchProjects(true)}
              disabled={isRefreshing}
              title="Sync latest repos from GitHub"
              className="flex items-center justify-center rounded-xl border border-white/10 bg-dark-800/80 p-2.5 text-slate-400 transition-all hover:border-emerald-500/40 hover:text-emerald-400 disabled:opacity-50"
            >
              <RefreshCw
                className={`h-4 w-4 ${isRefreshing ? "animate-spin text-emerald-400" : ""}`}
              />
            </button>
          </div>
        </motion.div>

        {/* Project Cards Grid */}
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            <motion.div
              layout
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredProjects.map((project, i) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="border-gradient glass group flex flex-col rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:glow-emerald"
                >
                  {/* Card Header with dynamic gradient */}
                  <div
                    className={`relative flex h-48 items-center justify-center overflow-hidden rounded-t-2xl bg-gradient-to-br ${project.gradient}`}
                  >
                    {/* Grid overlay */}
                    <div className="grid-pattern absolute inset-0 opacity-40" />

                    {/* Language & Activity Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      {project.language ? (
                        <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-dark-900/70 px-2.5 py-1 text-[11px] font-medium text-slate-300 backdrop-blur-md">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{
                              backgroundColor: getLanguageColor(project.language),
                            }}
                          />
                          {project.language}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-dark-900/70 px-2.5 py-1 text-[11px] font-medium text-slate-300 backdrop-blur-md">
                          <FolderGit2 className="h-3 w-3 text-emerald-400" />
                          Project
                        </span>
                      )}

                      {/* Stars / Forks Stats */}
                      <div className="flex items-center gap-2">
                        {project.stars > 0 && (
                          <span className="flex items-center gap-1 rounded-full border border-yellow-500/20 bg-dark-900/70 px-2 py-0.5 text-[10px] font-medium text-yellow-400 backdrop-blur-md">
                            <Star className="h-3 w-3 fill-yellow-400" />
                            {project.stars}
                          </span>
                        )}
                        {project.forks > 0 && (
                          <span className="flex items-center gap-1 rounded-full border border-cyan-500/20 bg-dark-900/70 px-2 py-0.5 text-[10px] font-medium text-cyan-400 backdrop-blur-md">
                            <GitFork className="h-3 w-3" />
                            {project.forks}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Central Icon */}
                    <motion.div
                      className={`relative z-10 rounded-2xl p-5 shadow-2xl transition-transform duration-300 group-hover:scale-110 ${
                        project.accentColor === "emerald"
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                          : "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"
                      }`}
                    >
                      <ProjectIconComponent
                        name={project.iconName}
                        className="h-10 w-10"
                      />
                    </motion.div>

                    {/* Shimmer effect on hover */}
                    <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {project.title}
                      </h3>
                    </div>

                    <p className="mb-5 flex-1 text-sm leading-relaxed text-slate-400">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="mb-6 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 text-xs font-medium text-slate-400 transition-colors hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Card Footer Actions */}
                    <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{project.relativeTime}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Live Demo Link (if available) */}
                        {project.homepage && (
                          <a
                            href={project.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 border border-emerald-500/20 transition-all hover:bg-emerald-500/20 hover:border-emerald-500/40"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            <span>Demo</span>
                          </a>
                        )}

                        {/* GitHub Repo Link */}
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 border border-white/10 transition-all hover:bg-white/10 hover:text-white"
                        >
                          <GithubIcon className="h-3.5 w-3.5" />
                          <span>Code</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-2xl p-12 text-center"
            >
              <Search className="mx-auto mb-3 h-8 w-8 text-slate-600" />
              <h3 className="text-lg font-semibold text-white">No projects found</h3>
              <p className="mt-1 text-sm text-slate-400">
                No projects matched your search for &quot;{searchQuery}&quot;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Explore All Repositories Call-To-Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a
            href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:glow-emerald"
          >
            <GithubIcon className="h-4 w-4 text-emerald-400" />
            <span>Explore All Repositories on GitHub</span>
            <ExternalLink className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-400" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
