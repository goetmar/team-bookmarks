import { Box, Paper } from "@mui/material";
import { BookmarkItem } from "../types/types";
import { isBookmark } from "../utils/bookmarkHelper";
import { Entry } from "./Entry";
import { Folder } from "./Folder";

export type ContentCardProps = { items: BookmarkItem[] };

export const ContentCard = (props: ContentCardProps) => {
  return props.items.length > 0 ? (
    <Paper sx={{ width: "100%" }}>
      {props.items.map((item, index) =>
        isBookmark(item) ? (
          <Entry bookmark={item} key={index} clipboard />
        ) : (
          <Folder folder={item} key={index} />
        )
      )}
    </Paper>
  ) : (
    <Box>Placeholder Content</Box>
  );
};
