import { MenuList } from "@mui/material";
import { filterFolders } from "../utils/bookmarkHelper";
import { FolderList } from "./FolderList";
import { BookmarkItem } from "../types/types";

export type FolderMenuProps = { items: BookmarkItem[] };

export const FolderMenu = (props: FolderMenuProps) => {
  const folders = filterFolders(props.items);

  return (
    <MenuList sx={{ p: 0 }}>
      <FolderList folders={folders} />
    </MenuList>
  );
};
