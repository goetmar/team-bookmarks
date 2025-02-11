import { FolderOpen } from "@mui/icons-material";
import { MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { BookmarkFolder } from "../types/types";
import { FolderList } from "./FolderList";

export type FolderListItemProps = { folder: BookmarkFolder; inset?: number };

export const FolderListItem = (props: FolderListItemProps) => {
  const inset = props.inset || 2;
  return (
    <>
      <MenuItem sx={{ pl: inset, borderRadius: "5px" }}>
        <ListItemIcon>
          <FolderOpen fontSize="small" />
        </ListItemIcon>
        <ListItemText
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {props.folder.name}
        </ListItemText>
      </MenuItem>
      {props.folder.bookmarks.length > 0 && (
        <FolderList folders={props.folder.bookmarks} inset={inset + 2} />
      )}
    </>
  );
};
