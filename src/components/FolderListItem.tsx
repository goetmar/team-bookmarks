import { ExpandLess, ExpandMore, FolderOpen } from "@mui/icons-material";
import {
  MenuItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
} from "@mui/material";
import { BookmarkFolder } from "../types/types";
import { FolderList } from "./FolderList";
import { ReactNode, useEffect, useState } from "react";
import { useBookmarkStore } from "../hooks/useBookmarkStore";
import { findFolderById } from "../utils/bookmarkHelper";

const textColor = "text.secondary";

type FolderMenuItemProps = {
  name: string;
  selected: boolean;
  inset?: number;
  onClick?: () => void;
  onDoubleClick?: () => void;
  children?: ReactNode;
};

const FolderMenuItem = (props: FolderMenuItemProps) => (
  <MenuItem
    selected={props.selected}
    onClick={props.onClick}
    onDoubleClick={props.onDoubleClick}
    sx={{ pl: props.inset, borderRadius: "5px" }}
  >
    {props.children}
    <ListItemIcon>
      <FolderOpen fontSize="small" sx={{ color: textColor }} />
    </ListItemIcon>
    <ListItemText>
      <Typography
        color={textColor}
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {props.name}
      </Typography>
    </ListItemText>
  </MenuItem>
);

export type FolderListItemProps = { folder: BookmarkFolder; inset?: number };

export const FolderListItem = (props: FolderListItemProps) => {
  const currentFolderId = useBookmarkStore((state) => state.currentFolderId);
  const setCurrentFolderId = useBookmarkStore(
    (state) => state.setCurrentFolderId
  );
  const inset = props.inset || 2;
  const selected = currentFolderId === props.folder.id;
  const handleClick = () => {
    if (!selected) {
      setCurrentFolderId(props.folder.id);
    }
  };

  if (props.folder.bookmarks.length > 0) {
    const [open, setOpen] = useState(true);

    useEffect(() => {
      if (
        !open &&
        currentFolderId !== props.folder.id &&
        findFolderById(props.folder, currentFolderId)
      ) {
        setOpen(true);
      }
    }, [currentFolderId]);

    const handleDoubleClick = () => {
      setOpen(!open);
    };
    return (
      <>
        <FolderMenuItem
          name={props.folder.name}
          selected={selected}
          inset={inset}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
        >
          {open ? (
            <ListItemIcon>
              <ExpandLess sx={{ color: textColor }} />
            </ListItemIcon>
          ) : (
            <ListItemIcon>
              <ExpandMore sx={{ color: textColor }} />
            </ListItemIcon>
          )}
        </FolderMenuItem>
        <Collapse in={open} timeout="auto">
          <FolderList folders={props.folder.bookmarks} inset={inset + 2} />
        </Collapse>
      </>
    );
  } else {
    return (
      <FolderMenuItem
        name={props.folder.name}
        selected={selected}
        inset={inset + 4.5}
        onClick={handleClick}
      />
    );
  }
};
