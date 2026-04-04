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
        "& .clipboard-copy, & .bookmark-name::after": {
          opacity: 0,
          transition: theme.transitions.create(["opacity"], {
            duration: theme.transitions.duration.short,
          }),
        },
        "& .bookmark-name::after": {
          color: theme.palette.text.secondary,
          fontWeight: theme.typography.body2.fontWeight,
          textTransform: "lowercase",
          marginLeft: theme.spacing(2),
        },
        "&:hover .clipboard-copy, &:hover .bookmark-name::after": {
          opacity: 1,
        },
        "& .clipboard-copy:focus-within": {
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
            "&:focus-visible .clipboard-copy, &:focus-visible .bookmark-name::after":
              {
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
            alt="favicon"
            height="16px"
            width="16px"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </Box>
        <Box
          component="span"
          className="bookmark-name"
          data-url={props.bookmark.url}
          sx={{
            "&::after": {
              content: "attr(data-url)",
            },
          }}
        >
          {props.bookmark.name}
        </Box>
      </CardItem>
      {props.clipboard && (
        <ClipboardCopy url={props.bookmark.url} className="clipboard-copy" />
      )}
    </Box>
  );
};
