import { Box, Toolbar } from "@mui/material";
import { ContentCard } from "./ContentCard";

export const AppContent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Toolbar />
      <Box
        component="main"
        justifyItems="center"
        sx={{
          p: 3,
          flex: "1 1 0",
          minWidth: "250px",
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        <ContentCard />
      </Box>
    </Box>
  );
};
