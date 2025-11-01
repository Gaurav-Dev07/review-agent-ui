import React from "react";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import { Star, CallSplit, CheckCircle } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

export interface Repository {
  owner: {
    login: string;
    id: number;
  };
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  private: boolean;
  updated_at: string;
  isIntegrated?: boolean; 
}

interface RepoCardProps {
  repository: Repository;
  selected?: boolean;
  integrated?: boolean; // ✅ new property
  onClick: (repository: Repository) => void;
}

export const RepoCard: React.FC<RepoCardProps> = ({
  repository,
  selected = false,
  integrated = false,
  onClick,
}) => {
  const theme = useTheme();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card
      onClick={!integrated ? () => onClick(repository) : undefined}
      sx={{
        cursor: integrated ? "default" : "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        background: selected
          ? "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)"
          : "rgba(26, 26, 46, 0.8)",
        border: selected
          ? `2px solid ${theme.palette.primary.main}`
          : "1px solid rgba(255, 255, 255, 0.1)",
        "&:hover": !integrated && {
          transform: "translateY(-4px)",
          boxShadow: "0 16px 48px -12px rgba(0, 0, 0, 0.4)",
          border: selected
            ? `2px solid ${theme.palette.primary.dark}`
            : `1px solid ${theme.palette.primary.main}`,
        },
        position: "relative",
        opacity: integrated ? 0.9 : 1, // slight muted effect for integrated
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            component="h3"
            sx={{ fontWeight: 600, color: "text.primary" }}
          >
            {repository.name}
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            {repository.private && (
              <Chip
                label="Private"
                size="small"
                sx={{
                  backgroundColor: "rgba(236, 72, 153, 0.2)",
                  color: "#ec4899",
                  fontWeight: 600,
                }}
              />
            )}
            {integrated && (
              <Chip
                label="Integrated"
                size="small"
                icon={<CheckCircle sx={{ fontSize: 16, fill: "lightgreen" }} />}
                sx={{
                  backgroundColor: theme.palette.success.light,
                  color: "lightgreen",
                  fontWeight: 600,
                }}
              />
            )}
          </Box>
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mb: 2,
            minHeight: "40px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {repository.description || "No description available"}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Star sx={{ fontSize: 16, color: "#fbbf24" }} />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {repository.stargazers_count}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <CallSplit sx={{ fontSize: 16, color: "text.secondary" }} />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {repository.forks_count}
            </Typography>
          </Box>
          {repository.language && (
            <Chip
              label={repository.language}
              size="small"
              variant="outlined"
              sx={{
                fontSize: "0.75rem",
                height: "20px",
              }}
            />
          )}
        </Box>

        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Updated {formatDate(repository.updated_at)}
        </Typography>
      </CardContent>
    </Card>
  );
};
