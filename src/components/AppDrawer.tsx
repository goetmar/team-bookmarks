import { Box, Drawer, Toolbar } from "@mui/material";
import { useEffect, useMemo, useRef } from "react";
import { FolderList } from "../components/FolderList";
import { useBookmarkStore } from "../hooks/useBookmarkStore";
import useResize from "../hooks/useResize";
import { filterFolders } from "../utils/bookmarkHelper";

export const AppDrawer = () => {
  const rootFolder = useBookmarkStore((state) => state.rootFolder);
  const filteredFolders = useMemo(() => {
    return filterFolders([rootFolder]);
  }, [rootFolder]);

  const { width, enableResize } = useResize();
  const widthRange = {
    minWidth: 250,
    maxWidth: "40%",
  };

  const ref = useRef<Element>(null);
  const trackResize = () => {
    if (ref.current) {
      const boundingRect = ref.current.getBoundingClientRect();
      const { width } = boundingRect;
      const root = document.documentElement;
      root.style.setProperty("--drawer-width", Math.round(width) + "px");
    }
  };

  const observer = new ResizeObserver(trackResize);
  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current, { box: "border-box" });
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <Drawer
      variant="permanent"
      style={{ width }}
      sx={{ ...widthRange }}
      slotProps={{
        paper: {
          style: { width },
          sx: (theme) => ({
            ...widthRange,
            border: "none",
            backgroundColor: theme.palette.background.default,
            overflowY: "visible",
          }),
        },
      }}
    >
      <Toolbar />
      <Box
        ref={ref}
        sx={(theme) => ({
          pr: 1,
          py: 3,
          height: "100%",
          overflowY: "auto",
          boxSizing: "border-box",
          borderRight: "solid 1px",
          borderColor: theme.palette.divider,
        })}
      >
        <FolderList folders={filteredFolders} />
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
