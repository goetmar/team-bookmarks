import { Box, Toolbar } from "@mui/material";
import { AppDrawer } from "../components/AppDrawer";
import AppNavBar from "../components/AppNavBar";
import { ContentCard } from "../components/ContentCard";

export const BookmarkPage = () => {
  return (
    <Box display={"flex"}>
      <AppNavBar />
      <AppDrawer />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100vh",
        }}
      >
        <Toolbar />
        <Box component="main" justifyItems="center" sx={{ flexGrow: 1, p: 3 }}>
          <ContentCard />
        </Box>
      </Box>
    </Box>
  );
};
