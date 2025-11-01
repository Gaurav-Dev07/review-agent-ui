import { Repository } from "@/components/atoms/RepoCard/RepoCard";
import { USER_ROUTES } from "@/utils/constants/api-routes";
import {
  GitHubUser,
  SaveUserRequest,
  WebhookCreateRequest,
} from "@/utils/interfaces/interfaces";
import axios, { AxiosInstance } from "axios";
import { profile } from "console";
import { access } from "fs";

const reviewApi = axios.create({
  baseURL:
    import.meta.env.VITE_CODE_REVIEW_SERVICE_BASE_URL ||
    "http://localhost:9000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export class ReviewAgentService {
  private static instance: ReviewAgentService;
  private reviewApi: AxiosInstance;

  static getInstance(): ReviewAgentService {
    if (!ReviewAgentService.instance) {
      ReviewAgentService.instance = new ReviewAgentService();
    }
    return ReviewAgentService.instance;
  }

  constructor() {
    this.reviewApi = reviewApi;
  }

  async exchangeCodeForToken(code: string): Promise<string> {
    try {
      const response = await this.reviewApi.post("/github/auth/exchange-code", {
        code,
      });
      return response.data;
    } catch (error) {
      console.error("Error exchanging code for token:", error);
      throw error;
    }
  }

  async createWebhook(webhookRequest: WebhookCreateRequest): Promise<void> {
    const { repo, owner, token, webhookUrl } = webhookRequest;
    try {
      await this.reviewApi.post("/github/create-webhook", {
        repo: repo,
        owner: owner,
        token: token,
        webhookUrl: webhookUrl,
      });
    } catch (error) {
      console.error("Error applying agent to repository:", error);
      throw error;
    }
  }

  async saveUser(userData: any, token: string): Promise<void> {
    try {
      await this.reviewApi.post(USER_ROUTES.saveUser, userData, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });
    } catch (error) {
      console.error("Error saving user data:", error);
      throw error;
    }
  }

  async getUserRepos(userName: string): Promise<Repository[]> {
    try {
      const response = await this.reviewApi.get(
        `/v1/user/${userName}/repos`,
        {}
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user repositories:", error);
      throw error;
    }
  }

  async saveUserToBackend(user: SaveUserRequest, token: string) {
    try {
      await this.reviewApi.post(USER_ROUTES.saveUser, user, {
        headers: {},
      });
    } catch (error) {
      console.error("Error saving user to backend:", error);
      throw error;
    }
  }
}
