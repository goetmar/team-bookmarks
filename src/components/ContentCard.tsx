import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useBookmarkStore } from "../hooks/useBookmarkStore";
import {
  findFolderById,
  findParentFolderById,
  isBookmark,
} from "../utils/bookmarkHelper";
import { BookmarkEntry } from "./BookmarkEntry";
import { FolderEntry } from "./FolderEntry";

export const ContentCard = () => {
  const { isSearching, searchResults, settings } = useBookmarkStore();
  const currentFolder = useBookmarkStore((state) =>
    findFolderById([state.rootFolder], state.currentFolderId)
  );
  const parentFolder = useBookmarkStore((state) =>
    findParentFolderById(state.rootFolder, state.currentFolderId)
  );

  const showParent = settings.parent;
  const cardItems = isSearching
    ? searchResults
    : currentFolder?.bookmarks ?? [];

  return (!isSearching && showParent && currentFolder) ||
    cardItems.length > 0 ? (
    <Paper
      sx={(theme) => ({
        width: "100%",
        maxWidth: "900px",
        py: theme.shape.borderRadius + "px",
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
          <BookmarkEntry
            key={item.id}
            bookmark={item}
            clipboard
            openInNewTab={settings.openInNewTab}
          />
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
