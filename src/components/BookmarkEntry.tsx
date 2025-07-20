import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SyntheticEvent } from "react";
import { Bookmark } from "../types/types";
import { getFaviconByGoogleApi, getFaviconByUrl } from "../utils/faviconHelper";
import { CardItem } from "./CardItem";
import { ClipboardCopy } from "./ClipboardCopy";

// TODO get optional props from store
export type BookmarkEntryProps = {
  bookmark: Bookmark;
  clipboard?: boolean;
  openInNewTab?: boolean;
};

export const BookmarkEntry = (props: BookmarkEntryProps) => {
  const handleImageError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = getFaviconByGoogleApi(props.bookmark.url);
  };

  return (
    <Box
      sx={(theme) => ({
        position: "relative",
        "& .hidden-element": {
          opacity: 0,
          transition: theme.transitions.create(["opacity"], {
            duration: theme.transitions.duration.short,
          }),
        },
        "&:hover .hidden-element": {
          opacity: 1,
        },
      })}
    >
      <CardItem
        buttonProps={{
          href: props.bookmark.url,
          target: props.openInNewTab ? "_blank" : undefined,
          rel: props.openInNewTab ? "noopener" : undefined,
          sx: {
            pr: props.clipboard ? "50px" : null,
          },
        }}
      >
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
          className="hidden-element"
          color={"text.secondary"}
          textTransform={"lowercase"}
        >
          {props.bookmark.url}
        </Typography>
      </CardItem>
      {props.clipboard && (
        <ClipboardCopy url={props.bookmark.url} className="hidden-element" />
      )}
    </Box>
  );
};
