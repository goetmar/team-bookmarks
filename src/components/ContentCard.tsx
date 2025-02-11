import { Box, Paper } from "@mui/material";
import { BookmarkItem } from "../types/types";
import { CardItem } from "./CardItem";

export type ContentCardProps = { items: BookmarkItem[] };

export const ContentCard = (props: ContentCardProps) => {
  return props.items.length > 0 ? (
    <Paper sx={{ width: "100%" }}>
      {props.items.map((item, index) => (
        <CardItem item={item} key={index} clipboard openInNewTab />
      ))}
    </Paper>
  ) : (
    <Box>Placeholder Content</Box> //TODO add placeholder content
  );
};
