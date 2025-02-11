import { BookmarkItem, CardItemStyle } from "../types/types";
import { isBookmark } from "../utils/bookmarkHelper";
import { BookmarkEntry } from "./BookmarkEntry";
import { Folder } from "./Folder";

const itemStyle: CardItemStyle = {
  button: {
    fullWidth: true,
    sx: {
      justifyContent: "flex-start",
      borderRadius: 0,
    },
  },
  box: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    sx: {
      whiteSpace: "nowrap",
      overflow: "hidden",
    },
  },
};

export type CardItemProps = {
  item: BookmarkItem;
  clipboard?: boolean;
  openInNewTab?: boolean;
};

export const CardItem = (props: CardItemProps) => {
  return isBookmark(props.item) ? (
    <BookmarkEntry
      bookmark={props.item}
      style={itemStyle}
      clipboard={props.clipboard}
      openInNewTab={props.openInNewTab}
    />
  ) : (
    <Folder folder={props.item} style={itemStyle} />
  );
};
