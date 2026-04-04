import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import { ContentCard } from "./ContentCard";

export const MainContent = () => {
  return (
    <Box
      component="main"
      display="flex"
      alignItems="center"
      sx={{
        p: 3,
        flex: "1 1 0",
        minHeight: 0,
        minWidth: "250px",
        overflowX: "hidden",
        overflowY: "auto",
        flexDirection: "column",
      }}
    >
      {/* Offset for the AppNavBar */}
      <Toolbar />
      <Divider style={{ visibility: "hidden" }} />
      <ContentCard />
    </Box>
  );
};
