import { NextResponse } from "next/server";
import { GitHubRawRepo, ProjectsApiResponse } from "@/types/project";
import {
  FALLBACK_PROJECTS,
  GITHUB_USERNAME,
  transformGitHubRepo,
} from "@/lib/projects-data";

// Set route revalidation segment config (5 minutes = 300 seconds)
export const revalidate = 300;

export async function GET() {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "BuiltbyrahulX-Portfolio-App",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const apiUrl = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=100&type=owner`;

    const response = await fetch(apiUrl, {
      headers,
      next: { revalidate: 300 }, // Next.js ISR cache for 5 minutes
    });

    if (!response.ok) {
      console.warn(`GitHub API responded with status: ${response.status}. Using fallback data.`);
      const fallbackResponse: ProjectsApiResponse = {
        success: true,
        projects: FALLBACK_PROJECTS,
        total: FALLBACK_PROJECTS.length,
        fetchedAt: new Date().toISOString(),
        source: "fallback",
      };
      return NextResponse.json(fallbackResponse, {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
        },
      });
    }

    const rawRepos: GitHubRawRepo[] = await response.json();

    // Filter out non-project repositories (such as the personal profile README repo `builtbyrahulX`)
    const filteredRepos = rawRepos.filter((repo) => {
      // Hide the special profile README repo whose name matches the username
      if (repo.name.toLowerCase() === GITHUB_USERNAME.toLowerCase()) {
        return false;
      }
      return true;
    });

    // Transform and enrich each repository
    const transformedProjects = filteredRepos.map((repo, idx) =>
      transformGitHubRepo(repo, idx)
    );

    // If no repos were returned (e.g. empty account), fall back to curated data
    const finalProjects =
      transformedProjects.length > 0 ? transformedProjects : FALLBACK_PROJECTS;

    const apiResponse: ProjectsApiResponse = {
      success: true,
      projects: finalProjects,
      total: finalProjects.length,
      fetchedAt: new Date().toISOString(),
      source: "github",
    };

    return NextResponse.json(apiResponse, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Error fetching projects from GitHub API:", error);
    const fallbackResponse: ProjectsApiResponse = {
      success: true,
      projects: FALLBACK_PROJECTS,
      total: FALLBACK_PROJECTS.length,
      fetchedAt: new Date().toISOString(),
      source: "fallback",
    };

    return NextResponse.json(fallbackResponse, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
      },
    });
  }
}
