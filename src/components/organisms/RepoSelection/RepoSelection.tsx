import React from "react";
import { Container, Typography, Box, Alert } from "@mui/material";
import { SmartToyOutlined } from "@mui/icons-material";
import { RepoGrid } from "../../molecules/RepoGrid/RepoGrid";
import { GradientButton } from "../../atoms/GradientButton/GradientButton";
import { Repository } from "../../atoms/RepoCard/RepoCard";
import RobotCoder from "../../../assets/icons/robot.svg";
import axios from "axios";
import { ReviewAgentService } from "@/services/reviewAgent";

interface RepoSelectionProps {
  repositories: Repository[];
  selectedRepo: Repository | null;
  onRepoSelect: (repository: Repository) => void;
  onIntegrateAgent: () => void;
  loading?: boolean;
  integratingAgent?: boolean;
}

export const RepoSelection: React.FC<RepoSelectionProps> = ({
  repositories,
  selectedRepo,
  onRepoSelect,
  onIntegrateAgent,
  loading = false,
  integratingAgent = false,
}) => {
  const reviewAgentService = ReviewAgentService.getInstance();

  const [integrationLoading, setIntegrationLoading] =
    React.useState<boolean>(false);

  const handleIntegrateAgent =async () => {
    const accessToken = localStorage.getItem("githubAccessToken");
    try {
      setIntegrationLoading(true);
      // axios.post("http://localhost:9000/api/github/create-webhook", {
      //   repo: selectedRepo?.name,
      //   owner: selectedRepo?.owner.login,
      //   token: accessToken,
      //   webhookUrl: import.meta.env.VITE_CODE_REVIEW_WEBHOOK_URL,
      // });
      await reviewAgentService.createWebhook({
        repo: selectedRepo?.name,
        owner: selectedRepo?.owner.login,
        token: accessToken,
        webhookUrl: import.meta.env.VITE_CODE_REVIEW_WEBHOOK_URL,
      });
    } catch (error) {
      console.error("Error integrating agent:", error);
      alert("Failed to integrate agent. Please try again.");
    } finally {
      setIntegrationLoading(false);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ py: { xs: 3, md: 6 }, px: { xs: 2, md: 3 } }}
    >
      <Box sx={{ textAlign: "center", mb: { xs: 3, md: 6 } }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            mb: 2,
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
            fontWeight: 600,
            px: { xs: 1, md: 0 },
          }}
        >
          Select Repository
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            maxWidth: "600px",
            mx: "auto",
            mb: { xs: 3, md: 4 },
            fontSize: { xs: "0.875rem", md: "1.125rem" },
            px: { xs: 1, md: 0 },
          }}
        >
          Choose a repository to apply AI-powered code review analysis. Our
          intelligent agent will analyze your codebase and provide valuable
          insights.
        </Typography>

        {selectedRepo && (
          <Alert
            severity="info"
            sx={{
              maxWidth: "600px",
              mx: { xs: 1, md: "auto" },
              mb: { xs: 3, md: 4 },
              backgroundColor: "rgba(99, 102, 241, 0.1)",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              "& .MuiAlert-icon": {
                color: "#6366f1",
              },
            }}
          >
            <Typography variant="body2">
              Selected: <strong>{selectedRepo.full_name}</strong>
            </Typography>
          </Alert>
        )}
      </Box>

      <RepoGrid
        repositories={repositories}
        selectedRepo={selectedRepo}
        onRepoSelect={onRepoSelect}
        loading={loading}
      />

      {selectedRepo && !loading && (
        <Box sx={{ textAlign: "center", mt: { xs: 4, md: 6 } }}>
          <GradientButton
            variant="primary"
            size="large"
            onClick={handleIntegrateAgent}
            disabled={integratingAgent}
            startIcon={
              <img src={RobotCoder} alt="icon" height={"20px"} width={"20px"} />
            }
            sx={{
              fontSize: { xs: "1rem", md: "1.125rem" },
              padding: { xs: "12px 24px", md: "16px 32px" },
              minWidth: { xs: "180px", md: "200px" },
            }}
          >
            {integrationLoading ? "Integrating Agent..." : "Integrate Agent"}
          </GradientButton>
        </Box>
      )}
    </Container>
  );
};
