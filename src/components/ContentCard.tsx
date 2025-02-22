import { Box, Paper } from "@mui/material";
import { CardItem } from "./CardItem";
import { BookmarkItem } from "../types/types";

export type ContentCardProps = { items: BookmarkItem[] };

export const ContentCard = (props: ContentCardProps) => {
  return props.items.length > 0 ? (
    <Paper sx={{ width: "100%", py: 1 }}>
      {props.items.map((item, index) => (
        <CardItem item={item} key={index} clipboard openInNewTab />
      ))}
    </Paper>
  ) : (
    <Box>Placeholder Content</Box> //TODO add placeholder content
  );
};
