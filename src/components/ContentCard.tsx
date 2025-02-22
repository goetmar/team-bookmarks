import { Box, Paper } from "@mui/material";
import { CardItem } from "./CardItem";
import { BookmarkItem } from "../types/types";
import { useBookmarkStore } from "../hooks/useBookmarkStore";

export type ContentCardProps = { items: BookmarkItem[] };

export const ContentCard = (props: ContentCardProps) => {
  const isSearching = useBookmarkStore((state) => state.isSearching);
  return props.items.length > 0 ? (
    <Paper sx={{ width: "100%", maxWidth: "900px", minWidth: "200px", py: 1 }}>
      {props.items.map((item, index) => (
        <CardItem item={item} key={index} clipboard openInNewTab />
      ))}
    </Paper>
  ) : (
    <Box textAlign={"center"}>{isSearching ? "No Results" : "No Content"}</Box>
  );
};
