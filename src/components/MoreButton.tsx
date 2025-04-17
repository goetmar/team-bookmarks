import { MoreVert } from "@mui/icons-material";
import { ListItemText, MenuItem } from "@mui/material";
import { useBookmarkStore } from "../hooks/useBookmarkStore";
import { downloadBookmarksFile } from "../utils/fileExport";
import { MenuButton } from "./MenuButton";

export const MoreButton = () => {
  const rootFolder = useBookmarkStore((state) => state.rootFolder);

  return (
    <MenuButton label="More Options" icon={<MoreVert />}>
      <MenuItem
        onClick={() => {
          downloadBookmarksFile("bookmark_export.html", rootFolder.bookmarks);
        }}
      >
        <ListItemText primary={"Export Bookmarks"} sx={{ m: 0 }} />
      </MenuItem>
    </MenuButton>
  );
};
