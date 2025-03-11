import { MenuList } from "@mui/material";
import { BookmarkItem } from "../types/types";
import { isBookmark } from "../utils/bookmarkHelper";
import { FolderListItem } from "./FolderListItem";

export type FolderListProps = { folders: BookmarkItem[]; inset?: number };

export const FolderList = (props: FolderListProps) => (
  <MenuList disablePadding>
    {props.folders.map((item) => {
      return (
        !isBookmark(item) && (
          <FolderListItem
            key={item.id}
            folder={item}
            inset={props.inset || 2}
          />
        )
      );
    })}
  </MenuList>
);
