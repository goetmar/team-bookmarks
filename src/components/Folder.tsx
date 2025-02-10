import { Box, Button } from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { BookmarkFolder } from "../types/types";
// import { filterBookmarks } from "../utils/bookmarkHelper";

export type FolderProps = { folder: BookmarkFolder };

export const Folder = (props: FolderProps) => {
  // const allBookmarkLinks = filterBookmarks(props.folder.bookmarks).map(
  //   (bm) => bm.url
  // );

  // there is a bug with uri-list type on chromium browsers: https://issues.chromium.org/issues/41011768
  // const uriList = !!(window as any).chrome
  //   ? allBookmarkLinks[0]
  //   : allBookmarkLinks.join("\r\n");

  return (
    <Button
      fullWidth
      style={{ justifyContent: "flex-start" }}
      // draggable
      // onDragStart={(event) => {
      //   event.dataTransfer.setData("text/uri-list", uriList);
      //   event.dataTransfer.setData("text/plain", uriList);
      // }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <FolderOpenIcon />
        {props.folder.name}
      </Box>
    </Button>
  );
};
