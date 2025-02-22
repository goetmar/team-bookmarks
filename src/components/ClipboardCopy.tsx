import { Tooltip, IconButton, Snackbar } from "@mui/material";
import { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export type ClipboardCopyProps = { url: string };

export const ClipboardCopy = (props: ClipboardCopyProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip title="Copy to clipboard" placement="left" disableInteractive>
        <IconButton
          size="small"
          sx={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translate(0, -50%)",
          }}
          onClick={() => {
            navigator.clipboard.writeText(props.url);
            setOpen(true);
          }}
        >
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Snackbar
        message="Copied to clipboard!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={1500}
        onClose={() => setOpen(false)}
        open={open}
      />
    </>
  );
};
