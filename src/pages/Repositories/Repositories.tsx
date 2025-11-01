import MainTemplate from "@/components/templates/MainTemplate/MainTemplate";
import React, { useCallback, useEffect, useState } from "react";
import { RepositoriesProps } from "./interfaces";
import { Repository } from "@/components/atoms/RepoCard/RepoCard";
import { GitHubService } from "@/services/github";
import { useToast } from "@/hooks/useToast";
import { ToastContainer } from "@/components/molecules/ToastContainer/ToastContainer";
import { RepoSelection } from "@/components/organisms/RepoSelection/RepoSelection";
import { GitHubUser } from "@/utils/interfaces/interfaces";
import { ReviewAgentService } from "@/services/reviewAgent";

const Repositories: React.FC<RepositoriesProps> = ({ onLogout }) => {
  const [user, setUser] = useState<GitHubUser>(null);
  const [userDataLoading, setUserDataLoading] = useState(true);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [reposLoading, setReposLoading] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [agentLoading, setAgentLoading] = useState(false);
  // this can be used with context api
  const { toasts, showToast, removeToast } = useToast();

  const githubService = GitHubService.getInstance();
  const reviewAgentService = ReviewAgentService.getInstance();

  const loadRepositories = useCallback(async () => {
    {
      try {
        setReposLoading(true);
        const repos = await reviewAgentService.getUserRepos(user?.login);
        setRepositories(repos);
      } catch (error) {
        showToast("Failed to load repositories. Please try again.", "error");
        console.error("Failed to load repositories:", error);
      } finally {
        setReposLoading(false);
      }
    }
  }, [reviewAgentService, showToast, user?.login]);

  const getAndSetUser = async () => {
    try {
      setUserDataLoading(true);
      const userData = await githubService.getUserData();
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Authentication failed:", error);
      showToast("Authentication failed. Please try again.", "error");
    } finally {
      setUserDataLoading(false);
    }
  };

  const handleRepoSelect = (repository: Repository) => {
    setSelectedRepo(repository);
    showToast(`Selected repository: ${repository.name}`, "info");
  };

  const handleApplyAgent = async () => {
    if (!selectedRepo) return;

    try {
      setAgentLoading(true);
      await githubService.applyAgent(selectedRepo);
      showToast("Agent applied successfully!", "success");
    } catch (error) {
      showToast("Failed to apply agent. Please try again.", "error");
      console.error("Failed to apply agent:", error);
    } finally {
      setAgentLoading(false);
    }
  };

  useEffect(() => {
    if (!githubService.isAuthenticated()) {
      console.error("User not authenticated, initiating authentication...");
    } else {
      getAndSetUser();
    }
  }, []);

  useEffect(() => {
    if (user) {
      console.log("Fetching repositories for user:", user);
      loadRepositories();
    };
  }, [loadRepositories, user]);

  return (
    <MainTemplate user={user} handleLogout={onLogout}>
      <RepoSelection
        repositories={repositories}
        selectedRepo={selectedRepo}
        onRepoSelect={handleRepoSelect}
        onIntegrateAgent={handleApplyAgent}
        loading={reposLoading}
        integratingAgent={agentLoading}
      />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </MainTemplate>
  );
};

export default Repositories;
