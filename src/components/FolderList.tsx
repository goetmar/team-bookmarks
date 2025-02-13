import { MenuList } from "@mui/material";
import { BookmarkItem } from "../types/types";
import { isBookmark } from "../utils/bookmarkHelper";
import { FolderListItem } from "./FolderListItem";

export type FolderListProps = { folders: BookmarkItem[]; inset?: number };

export const FolderList = (props: FolderListProps) => (
  <MenuList disablePadding>
    {props.folders.map((item, index) => {
      return (
        !isBookmark(item) && (
          <FolderListItem key={index} folder={item} inset={props.inset} />
        )
      );
    })}
  </MenuList>
);
