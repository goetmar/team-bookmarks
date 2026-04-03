import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
        "& .hidden-element": {
          opacity: 0,
          transition: theme.transitions.create(["opacity"], {
            duration: theme.transitions.duration.short,
          }),
          "&:focus-visible": {
            opacity: 1,
          },
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
            "&:focus-visible .hidden-element": {
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
