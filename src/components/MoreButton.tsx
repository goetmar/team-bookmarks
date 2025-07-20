import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import { useBookmarkStore } from "../hooks/useBookmarkStore";
import { downloadBookmarksFile } from "../utils/fileExport";
import { MenuButton } from "./MenuButton";

export const MoreButton = () => {
  const rootFolder = useBookmarkStore((state) => state.rootFolder);

  return (
    <MenuButton label="More Options" icon={<MoreVertIcon />}>
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
