import { Box, Button, IconButton, Snackbar, Tooltip } from "@mui/material";
import React, { SyntheticEvent } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Bookmark } from "../types";

const getBaseUrl = (url: string) => {
  const pathArray = url.split("/");
  const protocol = pathArray[0];
  const host = pathArray[2];
  const baseUrl = protocol + "//" + host;
  return baseUrl;
};

export const Entry = (entry: Bookmark) => {
  const getFaviconByUrl = () => {
    return getBaseUrl(entry.url) + "/favicon.ico";
  };

  const getFaviconByGoogleApi = () => {
    return `https://www.google.com/s2/favicons?domain=${entry.url}&size=32`;
  };

  const handleImageError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = getFaviconByGoogleApi();
  };

  const [open, setOpen] = React.useState(false);

  return (
    <Box display="flex" justifyContent="space-between">
      <Button
        href={entry.url}
        target="_blank"
        fullWidth
        style={{ justifyContent: "flex-start" }}
      >
        <Box display="flex" alignItems="center" pr="8px">
          <img
            src={getFaviconByUrl()}
            alt="favicon"
            height="16"
            width="16"
            onError={handleImageError}
          />
        </Box>
        {entry.name}
      </Button>
      <Tooltip title="Copy to clipboard" placement="right">
        <IconButton
          onClick={() => {
            navigator.clipboard.writeText(entry.url);
            setOpen(true);
          }}
        >
          <ContentCopyIcon />
        </IconButton>
      </Tooltip>
      <Snackbar
        message="Copied to clipboard!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={1500}
        onClose={() => setOpen(false)}
        open={open}
      />
    </Box>
  );
};
