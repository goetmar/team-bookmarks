import {
  ExpandLess,
  ExpandMore,
  Folder,
  FolderOpen,
} from "@mui/icons-material";
import {
  Collapse,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Theme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useBookmarkStore } from "../hooks/useBookmarkStore";
import { BookmarkFolder } from "../types/types";
import { findFolderById } from "../utils/bookmarkHelper";
import { FolderList } from "./FolderList";

export type FolderListItemProps = {
  folder: BookmarkFolder;
  inset: number;
  isRoot?: boolean;
};

export const FolderListItem = (props: FolderListItemProps) => {
  const { currentFolderId, isSearching, setIsSearching, setCurrentFolderId } =
    useBookmarkStore();
  const hasSubfolders = props.folder.bookmarks.length > 0;
  const isSelected = !isSearching && currentFolderId === props.folder.id;
  const handleClick = () => {
    isSearching && setIsSearching(false);
    !isSelected && setCurrentFolderId(props.folder.id);
  };

  const [open, setOpen] = useState(props.isRoot || !hasSubfolders);
  useEffect(() => {
    if (hasSubfolders && !open) {
      const isParentOfCurrentFolder =
        currentFolderId !== props.folder.id &&
        findFolderById(props.folder.bookmarks, currentFolderId);
      isParentOfCurrentFolder && setOpen(true);
    }
  }, [currentFolderId]);
  const handleDoubleClick = () => {
    setOpen((open) => !open);
  };

  const color = isSelected ? "primary.main" : "text.secondary";
  const hoverStyle = (theme: Theme, mode: "light" | "dark") => {
    return {
      "&:hover *": {
        color: isSelected
          ? mode === "light"
            ? theme.palette.primary.dark
            : theme.palette.primary.light
          : theme.palette.text.primary,
      },
    };
  };

  return (
    <>
      <MenuItem
        dense
        selected={isSelected}
        onClick={handleClick}
        onDoubleClick={hasSubfolders ? handleDoubleClick : undefined}
        sx={[
          (theme) => ({
            pl: props.inset,
            width: "fit-content",
            minWidth: "100%",
            borderTopRightRadius: theme.shape.borderRadius + "px",
            borderBottomRightRadius: theme.shape.borderRadius + "px",
            "*": { color },
          }),
          (theme) => hoverStyle(theme, "light"),
          (theme) => theme.applyStyles("dark", hoverStyle(theme, "dark")),
        ]}
      >
        <ListItemIcon>
          {hasSubfolders && (open ? <ExpandLess /> : <ExpandMore />)}
        </ListItemIcon>
        <ListItemIcon>{open ? <FolderOpen /> : <Folder />}</ListItemIcon>
        <ListItemText slotProps={{ primary: { fontWeight: 500 } }}>
          {props.folder.name}
        </ListItemText>
      </MenuItem>
      {hasSubfolders && (
        <Collapse in={open} timeout="auto">
          <FolderList
            folders={props.folder.bookmarks}
            inset={props.inset + 2}
          />
        </Collapse>
      )}
    </>
  );
};
