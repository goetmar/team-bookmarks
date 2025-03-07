import { Box, Toolbar } from "@mui/material";
import { AppDrawer } from "../components/AppDrawer";
import AppNavBar from "../components/AppNavBar";
import { ContentCard } from "../components/ContentCard";
import { useBookmarkStore } from "../hooks/useBookmarkStore";

export const BookmarkPage = () => {
  const cardItems = useBookmarkStore((state) => state.getCardItems());

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
          <ContentCard items={cardItems} />
        </Box>
      </Box>
    </Box>
  );
};
