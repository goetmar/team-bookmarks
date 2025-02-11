import { BookmarkItem } from "../types/types";
import { isBookmark } from "../utils/bookmarkHelper";
import { FolderListItem } from "./FolderListItem";

export type FolderListProps = { folders: BookmarkItem[]; inset?: number };

// TODO if we add an id for the items later on, the key prop should be id instead of name
export const FolderList = (props: FolderListProps) => (
  <>
    {props.folders.map((item) => {
      return (
        !isBookmark(item) && (
          <FolderListItem key={item.name} folder={item} inset={props.inset} />
        )
      );
    })}
  </>
);
