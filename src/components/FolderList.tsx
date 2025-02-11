import { BookmarkItem } from "../types/types";
import { isBookmark } from "../utils/bookmarkHelper";
import { FolderListItem } from "./FolderListItem";

export type FolderListProps = { folders: BookmarkItem[]; inset?: number };

export const FolderList = (props: FolderListProps) => (
  <>
    {props.folders.map(
      (item, index) =>
        !isBookmark(item) && (
          <FolderListItem key={index} folder={item} inset={props.inset} />
        )
    )}
  </>
);
