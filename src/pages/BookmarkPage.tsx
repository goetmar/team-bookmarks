import { Box, Drawer, Toolbar } from "@mui/material";
import { ContentCard } from "../components/ContentCard";
import { useBookmarkStore } from "../hooks/useBookmarkStore";
import { FolderList } from "../components/FolderList";
import { filterFolders } from "../utils/bookmarkHelper";
import AppNavBar from "../components/AppNavBar";

export const BookmarkPage = () => {
  const rootFolder = useBookmarkStore((state) => state.rootFolder);
  const cardItems = useBookmarkStore((state) => state.getCardItems());

  const drawerWidth = 300;

  return (
    <Box display={"flex"}>
      <AppNavBar />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            border: "none",
            backgroundColor: (theme) => theme.palette.background.default,
          },
        }}
      >
        <Toolbar />
        <Box
          sx={{
            p: 3,
            overflowY: "auto",
          }}
        >
          <FolderList folders={filterFolders([rootFolder])} />
        </Box>
      </Drawer>
      <Box
        component="main"
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        sx={{ flexGrow: 1, p: 3 }}
      >
        <Toolbar />
        <ContentCard items={cardItems} />
      </Box>
    </Box>
  );
};
