import { Box, Paper } from "@mui/material";
import { useBookmarkStore } from "../hooks/useBookmarkStore";
import { BookmarkItem } from "../types/types";
import { CardItem } from "./CardItem";

export type ContentCardProps = { items: BookmarkItem[] };

export const ContentCard = (props: ContentCardProps) => {
  const isSearching = useBookmarkStore((state) => state.isSearching);
  return props.items.length > 0 ? (
    <Paper
      sx={{
        width: "100%",
        maxWidth: "900px",
        minWidth: "200px",
        py: (theme) => theme.shape.borderRadius + "px",
      }}
    >
      {props.items.map((item, index) => (
        <CardItem item={item} key={index} clipboard openInNewTab />
      ))}
    </Paper>
  ) : (
    <Box height="100%" alignContent="center">
      {isSearching ? "No Results" : "No Content"}
    </Box>
  );
};
