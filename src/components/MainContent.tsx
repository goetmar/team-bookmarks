import Box from "@mui/material/Box";
import { ContentCard } from "./ContentCard";

export const MainContent = () => {
  return (
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
  );
};
