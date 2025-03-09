import { Box, Divider, Paper } from "@mui/material";
import { useMemo } from "react";
import { useBookmarkStore } from "../hooks/useBookmarkStore";
import { isBookmark } from "../utils/bookmarkHelper";
import { BookmarkEntry } from "./BookmarkEntry";
import { FolderEntry } from "./FolderEntry";

export const ContentCard = () => {
  const {
    isSearching,
    searchResults,
    rootFolder,
    currentFolderId,
    getCurrentFolder,
    getParentFolder,
  } = useBookmarkStore();
  const [currentFolder, parentFolder] = useMemo(() => {
    return [getCurrentFolder(), getParentFolder()];
  }, [rootFolder, currentFolderId]);

  const cardItems = isSearching
    ? searchResults
    : currentFolder?.bookmarks || [];

  // TODO display parent and current folder optionally
  return cardItems.length > 0 ? (
    <Paper
      sx={{
        width: "100%",
        maxWidth: "900px",
        py: (theme) => theme.shape.borderRadius + "px",
      }}
    >
      {parentFolder && <FolderEntry folder={parentFolder} variant={"up"} />}
      {currentFolder && <FolderEntry folder={currentFolder} variant={"open"} />}
      <Divider />
      {cardItems.map((item) =>
        isBookmark(item) ? (
          <BookmarkEntry bookmark={item} key={item.id} clipboard openInNewTab />
        ) : (
          <FolderEntry folder={item} variant={"close"} />
        )
      )}
    </Paper>
  ) : (
    <Box height="100%" alignContent="center">
      {isSearching ? "No Results" : "No Content"}
    </Box>
  );
};
