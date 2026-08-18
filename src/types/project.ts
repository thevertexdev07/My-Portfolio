export interface GitHubRawRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
}

export type ProjectCategory = "all" | "ai-ml" | "web-apps" | "tools";

export interface ProjectItem {
  id: string | number;
  name: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
  homepage?: string | null;
  language?: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
  relativeTime: string;
  category: "ai-ml" | "web-apps" | "tools";
  iconName: string;
  gradient: string;
  accentColor: "emerald" | "cyan";
  isFeatured?: boolean;
}

export interface ProjectsApiResponse {
  success: boolean;
  projects: ProjectItem[];
  total: number;
  fetchedAt: string;
  source: "github" | "cache" | "fallback";
}
