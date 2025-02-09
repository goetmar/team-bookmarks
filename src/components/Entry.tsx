import {
  Box,
  Button,
  IconButton,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const getBaseUrl = (url: string) => {
  const pathArray = url.split("/");
  const protocol = pathArray[0];
  const host = pathArray[2];
  const baseUrl = protocol + "//" + host;
  return baseUrl;
};

export type EntryProps = { name: string; url: string; clipboard?: boolean };

export const Entry = (props: EntryProps) => {
  const getFaviconByUrl = () => {
    return getBaseUrl(props.url) + "/favicon.ico";
  };

  const getFaviconByGoogleApi = () => {
    return `https://www.google.com/s2/favicons?domain=${props.url}&size=16`;
  };

  const handleImageError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = getFaviconByGoogleApi();
  };

  const [open, setOpen] = useState(false);

  return (
    <Box display="flex" justifyContent="space-between">
      <Button
        href={props.url}
        target="_blank"
        fullWidth
        style={{ justifyContent: "flex-start" }}
        sx={{
          "& .hidden-url": {
            display: "none",
          },
          "&:hover .hidden-url": {
            display: "flex",
          },
          whiteSpace: "nowrap",
          overflow: "hidden",
          pl: 2,
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <img
            src={getFaviconByUrl()}
            alt="favicon"
            height="16px"
            width="16px"
            onError={handleImageError}
          />
          {props.name}
          <Typography
            variant="body2"
            className="hidden-url"
            color={"text.disabled"}
            sx={{
              textTransform: "lowercase",
              ml: 2,
            }}
          >
            {props.url}
          </Typography>
        </Box>
      </Button>
      {props.clipboard && (
        <Tooltip title="Copy to clipboard" placement="left">
          <IconButton
            onClick={() => {
              navigator.clipboard.writeText(props.url);
              setOpen(true);
            }}
          >
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
      )}
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
