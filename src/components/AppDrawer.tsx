import { Box, Drawer, Toolbar } from "@mui/material";
import { useBookmarkStore } from "../hooks/useBookmarkStore";
import { FolderList } from "../components/FolderList";
import { filterFolders } from "../utils/bookmarkHelper";
import useResize from "../hooks/useResize";
import { useEffect, useRef } from "react";

export const AppDrawer = () => {
  const rootFolder = useBookmarkStore((state) => state.rootFolder);

  const minWidth = 250;
  const maxWidth = "40%";
  const initialWidth = minWidth;

  const { width, enableResize } = useResize(initialWidth);
  const drawerWidth = {
    width: width,
    minWidth: minWidth,
    maxWidth: maxWidth,
  };

  const ref = useRef<Element>(null);
  const trackResize = () => {
    if (ref.current) {
      const { current } = ref;
      const boundingRect = current.getBoundingClientRect();
      const { width } = boundingRect;
      const root = document.documentElement;
      root.style.setProperty("--drawer-width", Math.round(width) + "px");
    }
  };

  const observer = new ResizeObserver(trackResize);
  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current);
    }
  }, []);

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
        ref={ref}
        sx={{
          pr: 1,
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
