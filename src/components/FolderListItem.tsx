import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import { Theme } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
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
  const selectFolder = () => {
    if (isSearching) setIsSearching(false);
    if (!isSelected) setCurrentFolderId(props.folder.id);
  };

  const isParentOfCurrentFolder = useMemo(() => {
    return (
      currentFolderId !== props.folder.id &&
      findFolderById(props.folder.bookmarks, currentFolderId) !== undefined
    );
    // TODO check if all deps can be included
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFolderId]);

  const [open, setOpen] = useState(props.isRoot || !hasSubfolders);
  useEffect(() => {
    if (hasSubfolders && !open) {
      if (isParentOfCurrentFolder) setOpen(true);
    }
    // TODO check if all deps can be included
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFolderId]);
  const toggleOpen = () => {
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
        onClick={selectFolder}
        onDoubleClick={hasSubfolders ? toggleOpen : undefined}
        sx={[
          (theme) => ({
            pl: props.inset,
            py: 0,
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
          {hasSubfolders && (
            <IconButton
              size="small"
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (open && isParentOfCurrentFolder) selectFolder();
                toggleOpen();
              }}
            >
              {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          )}
        </ListItemIcon>
        <ListItemIcon>
          {open ? <FolderOpenIcon /> : <FolderIcon />}
        </ListItemIcon>
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
