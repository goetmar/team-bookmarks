import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";

export type ClipboardCopyProps = { url: string; className?: string };

export const ClipboardCopy = (props: ClipboardCopyProps) => {
  const [copied, setCopied] = useState(false);

  return (
    <Tooltip
      className={props.className}
      title={copied ? "Link Copied!" : "Copy to clipboard"}
      placement="left"
      disableInteractive
      onClose={() => setTimeout(() => setCopied(false), 200)}
      slotProps={{
        tooltip: {
          sx: {
            backgroundColor: (theme) =>
              copied ? theme.palette.success.dark : theme.palette.grey[700],
          },
        },
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          right: 8,
          top: "50%",
          transform: "translate(0, -50%)",
          color: "text.secondary",
          "&:hover": {
            color: "text.primary",
          },
        }}
        onClick={() => {
          navigator.clipboard.writeText(props.url).then(
            () => setCopied(true),
            (reason) => {
              console.error(reason);
            }
          );
        }}
      >
        <ContentCopyIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};
