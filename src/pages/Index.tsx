import React, { useState, useEffect, useCallback } from "react";
import { Box } from "@mui/material";
import { Header } from "../components/organisms/Header/Header";
import { HeroSection } from "../components/organisms/HeroSection/HeroSection";
import { AuthSection } from "../components/molecules/AuthSection/AuthSection";
import { RepoSelection } from "../components/organisms/RepoSelection/RepoSelection";
import { ToastContainer } from "../components/molecules/ToastContainer/ToastContainer";
import { GitHubService } from "../services/github";
import { Repository } from "../components/atoms/RepoCard/RepoCard";
import { useToast } from "../hooks/useToast";
import { GitHubUser } from "@/utils/interfaces/interfaces";
import Loader from "@/components/atoms/Loader/Loader";
import MainTemplate from "@/components/templates/MainTemplate/MainTemplate";

const Index: React.FC = () => {
  const [user, setUser] = useState<GitHubUser>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [reposLoading, setReposLoading] = useState(false);
  const [agentLoading, setAgentLoading] = useState(false);
  const { toasts, showToast, removeToast } = useToast();
  const [userDataLoading, setUserDataLoading] = useState(false);

  const githubService = GitHubService.getInstance();

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

  const loadRepositories = useCallback(async () => {
    {
      try {
        setReposLoading(true);
        const repos = await githubService.getRepositories();
        setRepositories(repos);
      } catch (error) {
        showToast("Failed to load repositories. Please try again.", "error");
        console.error("Failed to load repositories:", error);
      } finally {
        setReposLoading(false);
      }
    }
  }, [githubService, showToast]);

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

  const handleLogout = () => {
    githubService.logout();
    setUser(null);
    setRepositories([]);
    setSelectedRepo(null);
    showToast("Logged out successfully", "info");
  };

  const handleGitHubAuth = () => {
    const GITHUB_CLIENT_ID = "Ov23liBJKrCCKdc3welL"; // TODO: Replace with your actual GitHub OAuth App client_id
    const REDIRECT_URI = "http://localhost:8080/auth/callback"; // TODO: Replace with your actual callback URL
    const SCOPE = "repo,admin:repo_hook,workflow";
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=${encodeURIComponent(
      SCOPE
    )}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    window.location.href = githubAuthUrl;
  };

  useEffect(() => {
    if (!githubService.isAuthenticated()) {
      console.error("User not authenticated, initiating authentication...");
    } else {
      getAndSetUser();
    }
  }, []);

  console.log("User state:", user);
  useEffect(() => {
    if (user) {
      loadRepositories();
    }
  }, [loadRepositories, user]);

  return (
    <MainTemplate user={user} handleLogout={handleLogout}>
      <Box component="main">
        {userDataLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
          >
            <Loader />
          </Box>
        ) : null}
        {/* {!user ? ( */}
        <>
          <HeroSection />
          <AuthSection onGitHubAuth={handleGitHubAuth} loading={authLoading} />
        </>
        {/* ) : (
          <RepoSelection
            repositories={repositories}
            selectedRepo={selectedRepo}
            onRepoSelect={handleRepoSelect}
            onIntegrateAgent={handleApplyAgent}
            loading={reposLoading}
            integratingAgent={agentLoading}
          />
        )} */}
      </Box>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </MainTemplate>
  );
};

export default Index;
