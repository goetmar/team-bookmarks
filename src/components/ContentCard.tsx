import { Box, Paper } from "@mui/material";
import { useMemo } from "react";
import { useBookmarkStore } from "../hooks/useBookmarkStore";
import { CardItem } from "./CardItem";

export const ContentCard = () => {
  const { isSearching, searchResults, currentFolderId, getCurrentFolder } =
    useBookmarkStore();
  const currentFolder = useMemo(() => {
    return getCurrentFolder().bookmarks;
  }, [currentFolderId]);

  const cardItems = isSearching ? searchResults : currentFolder;

  return cardItems.length > 0 ? (
    <Paper
      sx={{
        width: "100%",
        maxWidth: "900px",
        minWidth: "200px",
        py: (theme) => theme.shape.borderRadius + "px",
      }}
    >
      {cardItems.map((item, index) => (
        <CardItem item={item} key={index} clipboard openInNewTab />
      ))}
    </Paper>
  ) : (
    <Box height="100%" alignContent="center">
      {isSearching ? "No Results" : "No Content"}
    </Box>
  );
};
