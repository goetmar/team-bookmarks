import { ExpandLess, ExpandMore, FolderOpen } from "@mui/icons-material";
import {
  Collapse,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Theme,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { useBookmarkStore } from "../hooks/useBookmarkStore";
import { BookmarkFolder } from "../types/types";
import { findFolderById } from "../utils/bookmarkHelper";
import { FolderList } from "./FolderList";

type FolderMenuItemProps = {
  name: string;
  selected: boolean;
  inset?: number;
  onClick?: () => void;
  onDoubleClick?: () => void;
  children?: ReactNode;
};

const FolderMenuItem = (props: FolderMenuItemProps) => {
  const hoverStyle = (theme: Theme, mode: "light" | "dark") => {
    return {
      "&:hover *": {
        color: props.selected
          ? mode === "light"
            ? theme.palette.primary.dark
            : theme.palette.primary.light
          : theme.palette.text.primary,
      },
    };
  };

  return (
    <MenuItem
      dense
      selected={props.selected}
      onClick={props.onClick}
      onDoubleClick={props.onDoubleClick}
      sx={[
        {
          pl: props.inset,
          width: "fit-content",
          minWidth: "100%",
          borderTopRightRadius: (theme) => theme.shape.borderRadius + "px",
          borderBottomRightRadius: (theme) => theme.shape.borderRadius + "px",
          "*": { color: props.selected ? "primary.main" : "text.secondary" },
        },
        (theme) => hoverStyle(theme, "light"),
        (theme) => theme.applyStyles("dark", hoverStyle(theme, "dark")),
      ]}
    >
      {props.children}
      <ListItemIcon>
        <FolderOpen />
      </ListItemIcon>
      <ListItemText slotProps={{ primary: { fontWeight: 500 } }}>
        {props.name}
      </ListItemText>
    </MenuItem>
  );
};

export type FolderListItemProps = { folder: BookmarkFolder; inset?: number };

export const FolderListItem = (props: FolderListItemProps) => {
  const currentFolderId = useBookmarkStore((state) => state.currentFolderId);
  const isSearching = useBookmarkStore((state) => state.isSearching);
  const setIsSearching = useBookmarkStore((state) => state.setIsSearching);
  const setCurrentFolderId = useBookmarkStore(
    (state) => state.setCurrentFolderId
  );
  const inset = props.inset || 2;
  const selected = !isSearching && currentFolderId === props.folder.id;
  const handleClick = () => {
    setIsSearching(false);
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
              <ExpandLess />
            </ListItemIcon>
          ) : (
            <ListItemIcon>
              <ExpandMore />
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
