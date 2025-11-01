import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GitHubService } from "@/services/github";
import Loader from "@/components/atoms/Loader/Loader";
import MainTemplate from "@/components/templates/MainTemplate/MainTemplate";
import { GitHubUser } from "@/utils/interfaces/interfaces";
import { ReviewAgentService } from "@/services/reviewAgent";

// Placeholder for your backend API endpoint

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const githubService = GitHubService.getInstance();
  const reviewAgentService = ReviewAgentService.getInstance();

  const handleAuth = async (code: string) => {
    try {
      const token = await reviewAgentService.exchangeCodeForToken(code);
      githubService.setAccessToken(token);
      localStorage.setItem("githubAccessToken", token);
      const userData = await githubService.getUserData();
      await reviewAgentService.saveUserToBackend({
        userName: userData.login,
        email: userData.email,
        name: userData.name,  
        profileUrl: userData.html_url,
        company: userData.company,
        accessToken: token,
      }, token);
    } catch (error) {
      console.error("Error exchanging code for token:", error);
    }
    navigate("/repos", { replace: true });
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      handleAuth(code);
    } else {
      navigate("/error", { replace: true });
    }
  }, [navigate]);

  const user = localStorage.getItem("user");
  return (
    <MainTemplate
      user={JSON.parse(user) as GitHubUser | null}
      handleLogout={() => {
        localStorage.removeItem("githubAccessToken");
        localStorage.removeItem("user");
        githubService.setAccessToken(null);
        navigate("/", { replace: true });
      }}
    >
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Loader />
        </div>
      </>
    </MainTemplate>
  );
};

export default AuthCallback;
