import { Box, Button, Typography } from "@mui/material";
import { SyntheticEvent } from "react";
import { Bookmark, CardItemStyle } from "../types/types";
import { getFaviconByGoogleApi, getFaviconByUrl } from "../utils/faviconHelper";
import { ClipboardCopy } from "./ClipboardCopy";

export type BookmarkEntryProps = {
  bookmark: Bookmark;
  style: CardItemStyle;
  clipboard?: boolean;
  openInNewTab?: boolean;
};

export const BookmarkEntry = (props: BookmarkEntryProps) => {
  const handleImageError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = getFaviconByGoogleApi(props.bookmark.url);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Button
        {...props.style.button}
        href={props.bookmark.url}
        target={props.openInNewTab ? "_blank" : undefined}
        rel={props.openInNewTab ? "noopener" : undefined}
        sx={{
          ...props.style.button.sx,
          "& .hidden-url": {
            display: "none",
          },
          "&:hover .hidden-url": {
            display: "flex",
          },
          pr: props.clipboard ? "50px" : null,
        }}
      >
        <Box {...props.style.box}>
          <Box
            padding="2px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <img
              src={getFaviconByUrl(props.bookmark.url)}
              alt="favicon"
              height="16px"
              width="16px"
              onError={handleImageError}
            />
          </Box>
          {props.bookmark.name}
          <Typography
            variant="body2"
            className="hidden-url"
            color={"text.secondary"}
            sx={{
              textTransform: "lowercase",
            }}
          >
            {props.bookmark.url}
          </Typography>
        </Box>
      </Button>
      {props.clipboard && <ClipboardCopy url={props.bookmark.url} />}
    </Box>
  );
};
