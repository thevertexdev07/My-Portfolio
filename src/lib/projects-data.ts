import { GitHubRawRepo, ProjectItem } from "@/types/project";

export const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "builtbyrahulX";

/**
 * Format relative time (e.g. "2 days ago", "just now", "1 month ago")
 */
export function getRelativeTimeString(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (isNaN(diffInSeconds) || diffInSeconds < 0) {
      return "Recently updated";
    }

    if (diffInSeconds < 60) return "Just updated";
    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return "Yesterday";
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;
    const years = Math.floor(months / 12);
    return `${years}y ago`;
  } catch {
    return "Recently updated";
  }
}

/**
 * Clean and format repository name for presentation
 */
export function formatProjectTitle(repoName: string): string {
  // Common acronyms or specific naming
  if (repoName.toLowerCase() === "cortex-city") return "Cortex City";
  if (repoName.toLowerCase() === "acousticguard") return "Acoustic Guard";
  if (repoName.toLowerCase() === "my-portfolio") return "Personal Developer Portfolio";
  
  // Replace hyphens and underscores with spaces and title-case
  return repoName
    .replace(/[-_]/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

/**
 * Categorize repository based on metadata, language, and topics
 */
export function detectCategory(
  name: string,
  description?: string | null,
  topics: string[] = [],
  language?: string | null
): "ai-ml" | "web-apps" | "tools" {
  const combined = `${name} ${description || ""} ${topics.join(" ")} ${language || ""}`.toLowerCase();

  if (
    combined.includes("gnn") ||
    combined.includes("lstm") ||
    combined.includes("neural") ||
    combined.includes("machine-learning") ||
    combined.includes("deep-learning") ||
    combined.includes("tensorflow") ||
    combined.includes("pytorch") ||
    combined.includes("model") ||
    combined.includes("ai") ||
    combined.includes("nlp") ||
    combined.includes("scikit")
  ) {
    return "ai-ml";
  }

  if (
    combined.includes("nextjs") ||
    combined.includes("react") ||
    combined.includes("web") ||
    combined.includes("portfolio") ||
    combined.includes("frontend") ||
    combined.includes("fullstack") ||
    combined.includes("tailwind") ||
    combined.includes("app") ||
    language?.toLowerCase() === "typescript" ||
    language?.toLowerCase() === "javascript" ||
    language?.toLowerCase() === "html"
  ) {
    return "web-apps";
  }

  return "tools";
}

/**
 * Pick an appropriate Lucide icon name based on repo content
 */
export function detectIconName(
  name: string,
  description?: string | null,
  topics: string[] = [],
  language?: string | null
): string {
  const combined = `${name} ${description || ""} ${topics.join(" ")} ${language || ""}`.toLowerCase();

  if (combined.includes("cortex") || combined.includes("traffic") || combined.includes("network") || combined.includes("graph")) {
    return "Network";
  }
  if (combined.includes("acoustic") || combined.includes("guard") || combined.includes("security") || combined.includes("shield")) {
    return "Shield";
  }
  if (combined.includes("neural") || combined.includes("ai") || combined.includes("model") || combined.includes("learning")) {
    return "Cpu";
  }
  if (combined.includes("workflow") || combined.includes("action") || combined.includes("ci/cd") || combined.includes("pipeline")) {
    return "GitBranch";
  }
  if (combined.includes("portfolio") || combined.includes("website") || combined.includes("ui")) {
    return "Layers";
  }
  if (combined.includes("bot") || combined.includes("agent")) {
    return "Bot";
  }

  return "Code";
}

/**
 * Curated metadata overrides for well-known repositories
 */
const REPO_OVERRIDES: Record<
  string,
  {
    title?: string;
    description?: string;
    tags?: string[];
    homepage?: string;
    isFeatured?: boolean;
  }
> = {
  "cortex-city": {
    title: "Cortex City",
    description:
      "A traffic simulation platform powered by GNN-LSTM neural networks. Integrates real-time APIs to model urban traffic flow, predict congestion, and optimize route planning using graph-based deep learning.",
    tags: ["Python", "GNN-LSTM", "TensorFlow", "API Integration", "NetworkX", "Next.js"],
    homepage: "https://cortex-city-seven.vercel.app/",
    isFeatured: true,
  },
  "acousticguard": {
    title: "Acoustic Guard",
    description:
      "Intelligent acoustic threat monitoring and noise pattern classification system. Engineered for acoustic telemetry processing, automated threshold alerting, and edge sensory response.",
    tags: ["Kotlin", "Signal Processing", "Sensor Telemetry", "Machine Learning", "Edge AI"],
    isFeatured: true,
  },
  "my-portfolio": {
    title: "VERTEX.DEV Portfolio",
    description:
      "Modern dark-themed developer portfolio featuring dynamic GitHub sync, neon glassmorphism UI, Framer Motion interactive animations, and responsive App Router architecture.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GitHub API"],
    homepage: "https://vertex.dev-portfolio.vercel.app/",
    isFeatured: true,
  },
};

/**
 * Transform a raw GitHub repository from the API into an enriched ProjectItem
 */
export function transformGitHubRepo(repo: GitHubRawRepo, index: number): ProjectItem {
  const lowerName = repo.name.toLowerCase();
  const override = REPO_OVERRIDES[lowerName] || {};

  // Build tags
  const tagsSet = new Set<string>();
  if (repo.language) tagsSet.add(repo.language);
  if (repo.topics && Array.isArray(repo.topics)) {
    repo.topics.slice(0, 4).forEach((t) => tagsSet.add(t));
  }
  if (override.tags) {
    override.tags.forEach((t) => tagsSet.add(t));
  }
  if (tagsSet.size === 0) {
    tagsSet.add("Software Engineering");
    tagsSet.add("Open Source");
  }

  const gradientStyles = [
    "from-emerald-500/20 to-cyan-500/20",
    "from-cyan-500/20 to-emerald-500/20",
    "from-emerald-400/20 to-cyan-400/20",
    "from-cyan-400/20 to-teal-500/20",
    "from-teal-500/20 to-emerald-500/20",
  ];

  const gradient = gradientStyles[index % gradientStyles.length];
  const accentColor: "emerald" | "cyan" = index % 2 === 0 ? "emerald" : "cyan";

  const description =
    override.description ||
    repo.description ||
    `Open-source software repository built with ${repo.language || "modern development stacks"}. Part of Rahul Jangra's active GitHub engineering projects.`;

  return {
    id: repo.id,
    name: repo.name,
    title: override.title || formatProjectTitle(repo.name),
    description,
    tags: Array.from(tagsSet).slice(0, 5),
    github: repo.html_url,
    homepage: override.homepage || repo.homepage || null,
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    updatedAt: repo.pushed_at || repo.updated_at,
    relativeTime: getRelativeTimeString(repo.pushed_at || repo.updated_at),
    category: detectCategory(repo.name, description, repo.topics, repo.language),
    iconName: detectIconName(repo.name, description, repo.topics, repo.language),
    gradient,
    accentColor,
    isFeatured: override.isFeatured ?? (repo.stargazers_count > 0 || index < 3),
  };
}

/**
 * Fallback static projects list used for SSR or when API is unreachable
 */
export const FALLBACK_PROJECTS: ProjectItem[] = [
  {
    id: "cortex-city",
    name: "Cortex-City",
    title: "Cortex City",
    description:
      "A traffic simulation platform powered by GNN-LSTM neural networks. Integrates real-time APIs to model urban traffic flow, predict congestion, and optimize route planning using graph-based deep learning.",
    tags: ["Python", "GNN-LSTM", "TensorFlow", "API Integration", "NetworkX"],
    github: "https://github.com/builtbyrahulX/Cortex-City",
    homepage: "https://cortex-city-seven.vercel.app/",
    language: "JavaScript",
    stars: 1,
    forks: 0,
    updatedAt: new Date().toISOString(),
    relativeTime: "Active",
    category: "ai-ml",
    iconName: "Network",
    gradient: "from-emerald-500/20 to-cyan-500/20",
    accentColor: "emerald",
    isFeatured: true,
  },
  {
    id: "acoustic-guard",
    name: "AcousticGuard",
    title: "Acoustic Guard",
    description:
      "Intelligent acoustic threat monitoring and sensor telemetry system. Engineered for acoustic frequency processing, edge response detection, and automated threshold alerts.",
    tags: ["Kotlin", "Sensors", "Edge AI", "Signal Processing", "Telemetry"],
    github: "https://github.com/builtbyrahulX/AcousticGuard",
    homepage: null,
    language: "Kotlin",
    stars: 0,
    forks: 0,
    updatedAt: new Date().toISOString(),
    relativeTime: "Active",
    category: "tools",
    iconName: "Shield",
    gradient: "from-cyan-500/20 to-emerald-500/20",
    accentColor: "cyan",
    isFeatured: true,
  },
  {
    id: "neural-network-models",
    name: "Neural-Network-ML-Models",
    title: "Neural Network & ML Models",
    description:
      "End-to-end machine learning pipeline configurations — from data preprocessing and feature engineering to model training, evaluation, and deployment-ready setups.",
    tags: ["Python", "PyTorch", "Scikit-learn", "Pandas", "NumPy"],
    github: "https://github.com/builtbyrahulX",
    homepage: null,
    language: "Python",
    stars: 0,
    forks: 0,
    updatedAt: new Date().toISOString(),
    relativeTime: "Active",
    category: "ai-ml",
    iconName: "Cpu",
    gradient: "from-emerald-400/20 to-cyan-400/20",
    accentColor: "emerald",
    isFeatured: true,
  },
  {
    id: "github-cicd-workflows",
    name: "github-cicd-workflows",
    title: "GitHub CI/CD Profile Workflows",
    description:
      "Automated GitHub Actions pipelines for dynamic profile READMEs, automated testing, and deployment workflows — turning repositories into self-maintaining systems.",
    tags: ["GitHub Actions", "YAML", "Shell", "CI/CD", "Automation"],
    github: "https://github.com/builtbyrahulX",
    homepage: null,
    language: "YAML",
    stars: 0,
    forks: 0,
    updatedAt: new Date().toISOString(),
    relativeTime: "Active",
    category: "tools",
    iconName: "GitBranch",
    gradient: "from-cyan-400/20 to-teal-500/20",
    accentColor: "cyan",
    isFeatured: false,
  },
];
