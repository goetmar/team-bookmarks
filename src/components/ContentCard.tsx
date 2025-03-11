import { Box, Paper } from "@mui/material";
import { useMemo } from "react";
import { useBookmarkStore } from "../hooks/useBookmarkStore";
import { isBookmark } from "../utils/bookmarkHelper";
import { BookmarkEntry } from "./BookmarkEntry";
import { FolderEntry } from "./FolderEntry";

export const ContentCard = () => {
  const {
    isSearching,
    searchResults,
    showParent,
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

  return (!isSearching && showParent && currentFolder) ||
    cardItems.length > 0 ? (
    <Paper
      sx={theme => ({
        width: "100%",
        maxWidth: "900px",
        py: theme.shape.borderRadius + "px"
      })}
    >
      {!isSearching && showParent && (
        <>
          {parentFolder && <FolderEntry folder={parentFolder} variant={"up"} />}
          {currentFolder && (
            <FolderEntry folder={currentFolder} variant={"open"} />
          )}
        </>
      )}
      {cardItems.map((item) =>
        isBookmark(item) ? (
          <BookmarkEntry key={item.id} bookmark={item} clipboard openInNewTab />
        ) : (
          <FolderEntry key={item.id} folder={item} variant={"close"} />
        )
      )}
    </Paper>
  ) : (
    <Box height="100%" alignContent="center">
      {isSearching ? "No Results" : "No Content"}
    </Box>
  );
};
