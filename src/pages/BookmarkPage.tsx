import { Box } from "@mui/material";
import { AppContent } from "../components/AppContent";
import { AppDrawer } from "../components/AppDrawer";
import AppNavBar from "../components/AppNavBar";

export const BookmarkPage = () => {
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <AppNavBar />
      <Box display={"flex"} flexDirection={"row"}>
        <AppDrawer />
        <AppContent />
      </Box>
    </Box>
  );
};
