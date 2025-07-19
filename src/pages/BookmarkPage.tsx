import { Box } from "@mui/material";
import { AppDrawer } from "../components/AppDrawer";
import AppNavBar from "../components/AppNavBar";
import { MainContent } from "../components/MainContent";

export const BookmarkPage = () => {
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <AppNavBar />
      <Box display={"flex"} flexDirection={"row"}>
        <AppDrawer />
        <MainContent />
      </Box>
    </Box>
  );
};
