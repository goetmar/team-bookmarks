import Box from "@mui/material/Box";
import { useState } from "react";
import { Bookmark } from "../types/types";
import { getFaviconSrc } from "../utils/faviconHelper";
import { CardItem } from "./CardItem";
import { ClipboardCopy } from "./ClipboardCopy";

const fallbackSrc = `${import.meta.env.BASE_URL}globe.svg`;
const requestedSize = 32;

export type BookmarkEntryProps = {
  bookmark: Bookmark;
  clipboard?: boolean;
  openInNewTab?: boolean;
};

export const BookmarkEntry = (props: BookmarkEntryProps) => {
  const [imgSrc, setImgSrc] = useState(
    getFaviconSrc(props.bookmark.url, requestedSize),
  );

  const handleImageError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    if (imgSrc === fallbackSrc) {
      return;
    }
    // Google's favicon API returns a 16x16 placeholder image when no favicon is found, in that case we want to use our own placeholder
    if (event.currentTarget.naturalWidth !== requestedSize) {
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <Box
      sx={(theme) => ({
        position: "relative",
        "& .clipboard-copy, & .bookmark-url": {
          opacity: 0,
          transition: theme.transitions.create(["opacity"], {
            duration: theme.transitions.duration.shortest,
          }),
        },
        "& .bookmark-url": {
          color: theme.palette.text.secondary,
          fontWeight: theme.typography.body2.fontWeight,
          textTransform: "lowercase",
          marginLeft: theme.spacing(2),
        },
        "& .bookmark-url::before": {
          content: "attr(data-url)",
        },
        "& .bookmark-name, & .bookmark-url": {
          minWidth: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        },
        "&:hover .clipboard-copy, &:hover .bookmark-url": {
          opacity: 1,
        },
        "& .clipboard-copy:focus-visible": {
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
            "&:focus-visible .clipboard-copy, &:focus-visible .bookmark-url": {
              opacity: 1,
            },
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
            src={imgSrc}
            alt=""
            height="16px"
            width="16px"
            onLoad={handleImageLoad}
            onError={handleImageError}
            aria-hidden
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            flexGrow: 1,
            minWidth: 0,
            overflow: "hidden",
          }}
        >
          <Box
            component="span"
            className="bookmark-name"
            sx={{
              flexGrow: 0,
              flexShrink: 0,
              maxWidth: "100%",
            }}
          >
            {props.bookmark.name}
          </Box>
          <Box
            component="span"
            className="bookmark-url"
            data-url={props.bookmark.url}
            aria-hidden
            sx={{
              flexGrow: 1,
              flexShrink: 1,
            }}
          />
        </Box>
      </CardItem>
      {props.clipboard && (
        <ClipboardCopy url={props.bookmark.url} className="clipboard-copy" />
      )}
    </Box>
  );
};
