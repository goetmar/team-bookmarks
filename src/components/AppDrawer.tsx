import { Box, Drawer, Toolbar } from "@mui/material";
import { useBookmarkStore } from "../hooks/useBookmarkStore";
import { FolderList } from "../components/FolderList";
import { filterFolders } from "../utils/bookmarkHelper";
import useResize from "../hooks/useResize";

export const AppDrawer = () => {
  const rootFolder = useBookmarkStore((state) => state.rootFolder);

  const initialWidth = "25%";
  const { width, enableResize } = useResize(initialWidth);
  const drawerWidth = {
    width: width,
    minWidth: 250,
    maxWidth: 1 / 3,
  };

  return (
    <Drawer
      variant="permanent"
      sx={{ ...drawerWidth, flexShrink: 0 }}
      slotProps={{
        paper: {
          sx: {
            ...drawerWidth,
            border: "none",
            backgroundColor: (theme) => theme.palette.background.default,
            overflowY: "visible",
          },
        },
      }}
    >
      <Toolbar />
      <Box
        sx={{
          pr: 2,
          py: 3,
          height: "100%",
          overflowY: "auto",
          boxSizing: "border-box",
          borderRight: "solid 1px",
          borderColor: (theme) => theme.palette.divider,
        }}
      >
        <FolderList folders={filterFolders([rootFolder])} />
      </Box>
      <Box
        onDragStart={(e) => {
          e.preventDefault();
        }}
        sx={{
          zIndex: "drawer",
          position: "absolute",
          width: "5px",
          height: "100%",
          right: "-2px",
          opacity: 0.5,
          cursor: "ew-resize",
        }}
        onMouseDown={enableResize}
      />
    </Drawer>
  );
};
