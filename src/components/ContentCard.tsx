import { Box, Paper } from "@mui/material";
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

export type ContentCardProps = { items: BookmarkItem[] };

export const ContentCard = (props: ContentCardProps) => {
  return props.items.length > 0 ? (
    <Paper sx={{ width: "100%" }}>
      {props.items.map((item, index) =>
        isBookmark(item) ? (
          <BookmarkEntry
            bookmark={item}
            key={index}
            style={itemStyle}
            clipboard
          />
        ) : (
          <Folder folder={item} key={index} style={itemStyle} />
        )
      )}
    </Paper>
  ) : (
    <Box>Placeholder Content</Box> //TODO add placeholder content
  );
};
