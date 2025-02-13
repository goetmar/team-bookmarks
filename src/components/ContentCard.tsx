import { Box, Paper } from "@mui/material";
import { CardItem } from "./CardItem";
import { useBookmarkStore } from "../hooks/useBookmarkStore";

export const ContentCard = () => {
  const currentFolder = useBookmarkStore((state) => state.getCurrentFolder());
  return currentFolder.bookmarks.length > 0 ? (
    <Paper sx={{ width: "100%", py: 1 }}>
      {currentFolder.bookmarks.map((item, index) => (
        <CardItem item={item} key={index} clipboard openInNewTab />
      ))}
    </Paper>
  ) : (
    <Box>Placeholder Content</Box> //TODO add placeholder content
  );
};
