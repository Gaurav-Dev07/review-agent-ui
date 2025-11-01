import React from "react";
import { Box, useTheme } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

const Loader = () => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100%"
      bgcolor={theme.palette.background.default}
    >
      <Box position="relative" display="flex" justifyContent="center" alignItems="center">
        {/* Custom Circular loader with gradient */}
        <svg width="96" height="96" viewBox="0 0 100 100" className="animate-spin">
          <defs>
            <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="url(#loaderGradient)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* GitHub Icon */}
        <GitHubIcon
          sx={{
            position: "absolute",
            fontSize: 40,
            color: theme.palette.text.primary,
            animation: "pulse 1.5s infinite, fade 3s ease-in-out infinite",
          }}
        />
      </Box>

      {/* Animations */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        @keyframes fade {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-spin {
          animation: spin 1.5s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  );
};

export default Loader;
