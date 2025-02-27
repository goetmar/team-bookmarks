import { Box, Drawer, Toolbar } from "@mui/material";
import { ContentCard } from "../components/ContentCard";
import { useBookmarkStore } from "../hooks/useBookmarkStore";
import { FolderList } from "../components/FolderList";
import { filterFolders } from "../utils/bookmarkHelper";
import AppNavBar from "../components/AppNavBar";

export const BookmarkPage = () => {
  const rootFolder = useBookmarkStore((state) => state.rootFolder);
  const cardItems = useBookmarkStore((state) => state.getCardItems());

  const drawerWidth = "25%";
  const drawerMinWidth = "249px";

  return (
    <Box display={"flex"}>
      <AppNavBar />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          minWidth: drawerMinWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            minWidth: drawerMinWidth,
            boxSizing: "border-box",
            border: "none",
            backgroundColor: (theme) => theme.palette.background.default,
          },
        }}
      >
        <Toolbar />
        <Box
          sx={{
            px: 2,
            py: 3,
            overflowY: "auto",
            height: "100%",
            borderRight: "solid 1px",
            borderColor: (theme) => theme.palette.divider,
          }}
        >
          <FolderList folders={filterFolders([rootFolder])} />
        </Box>
      </Drawer>
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar />
        <Box
          component="main"
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          sx={{ width: "100%", p: 3 }}
        >
          <ContentCard items={cardItems} />
        </Box>
      </Box>
    </Box>
  );
};
