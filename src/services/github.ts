import { Repository } from "@/components/atoms/RepoCard/RepoCard";
import { Github_API_ROUTES } from "@/utils/constants/api-routes";
import { GitHubUser } from "@/utils/interfaces/interfaces";
import axios from "axios";
import type { AxiosInstance } from "axios";
// Axios instance for GitHub API
const githubApi = axios.create({
  baseURL: Github_API_ROUTES.BASE,
  headers: {
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
  },
});

export class GitHubService {
  private static instance: GitHubService;
  private accessToken: string | null = null;
  private user: any = null;
  private githubApi: AxiosInstance;

  static getInstance(): GitHubService {
    if (!GitHubService.instance) {
      GitHubService.instance = new GitHubService();
    }
    return GitHubService.instance;
  }

  constructor() {
    this.githubApi = githubApi;
  }

  public getGithubApi(): AxiosInstance {
    return this.githubApi;
  }

  async authenticate(): Promise<any> {
    // Real authentication: get access token from localStorage and fetch user data
    const accessToken = localStorage.getItem("githubAccessToken");
    if (accessToken) {
      this.accessToken = accessToken;
      try {
        const response = await this.githubApi.get("user", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        this.user = response.data;
        return this.user;
      } catch (error) {
        console.error("Error fetching GitHub user:", error);
        throw error;
      }
    }
    return null;
  }

  async getUserData(): Promise<GitHubUser> {
    try {
      if (!this.isAuthenticated()) {
        throw new Error("User Not authenticated");
      }
      const savedUser = this.getUser()
      const response = await this.githubApi.get(Github_API_ROUTES.GET_USER, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      this.user = response.data;
      return this.user;
    } catch (error) {
      console.error("Error fetching GitHub user:", error);
      throw error;
    }
  }

  async getRepositories(): Promise<Repository[]> {
    if (!this.accessToken) {
      throw new Error("Not authenticated");
    }

    // Mock repositories data
    try {
      const response = await this.githubApi.get(
        Github_API_ROUTES.GET_REPOSITORIES,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching repositories:", error);
      throw error;
    }
  }

  async applyAgent(repository: Repository): Promise<void> {
    if (!this.accessToken) {
      throw new Error("Not authenticated");
    }

    // Mock API call to apply agent
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Applying agent to repository: ${repository.full_name}`);
        resolve();
      }, 2000);
    });
  }

  async exchangeCodeForToken(code: string) {
    try {
      const response = await this.githubApi.post(
        `${Github_API_ROUTES.EXCHANGE_CODE}`,
        {
          client_id: import.meta.env.VITE_OAUTH_APP_CLIENT_ID,
          client_secret: import.meta.env.VITE_OAUTH_APP_CLIENT_SECRET,
          code: code,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error exchanging code for token:", error);
    }
  }

  

  getUser() {
    return this.user;
  }

  logout() {
    this.accessToken = null;
    this.user = null;
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }
}
