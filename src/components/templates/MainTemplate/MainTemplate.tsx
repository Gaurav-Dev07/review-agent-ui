import React from "react";
import { MainTemplateProps } from "./interface";
import { Box } from "@mui/material";
import { Header } from "@/components/organisms/Header/Header";

const MainTemplate: React.FC<MainTemplateProps> = ({ user, handleLogout, children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      <Box sx={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <Header user={user} onLogout={handleLogout} />
      </Box>
      <Box>
        {children}
      </Box>
      
    </Box>
  );
};

export default MainTemplate;
