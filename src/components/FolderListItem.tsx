import { ExpandLess, ExpandMore, FolderOpen } from "@mui/icons-material";
import { MenuItem, ListItemIcon, ListItemText, Collapse } from "@mui/material";
import { BookmarkFolder } from "../types/types";
import { FolderList } from "./FolderList";
import { ReactNode, useState } from "react";
import { useBookmarkStore } from "../hooks/useBookmarkStore";

type FolderMenuItemProps = {
  name: string;
  selected: boolean;
  inset?: number;
  onClick?: () => void;
  children?: ReactNode;
};
const FolderMenuItem = (props: FolderMenuItemProps) => (
  <MenuItem
    selected={props.selected}
    onClick={props.onClick}
    sx={{ pl: props.inset, borderRadius: "5px" }}
  >
    {props.children}
    <ListItemIcon>
      <FolderOpen fontSize="small" />
    </ListItemIcon>
    <ListItemText
      sx={{
        whiteSpace: "nowrap",
        overflow: "hidden",
      }}
    >
      {props.name}
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

  if (props.folder.bookmarks.length > 0) {
    const [open, setOpen] = useState(true);

    const handleClick = () => {
      if (selected) {
        setOpen(!open);
      } else {
        setCurrentFolderId(props.folder.id);
      }
    };
    return (
      <>
        <FolderMenuItem
          name={props.folder.name}
          selected={selected}
          inset={inset}
          onClick={handleClick}
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
        <Collapse in={open} timeout="auto" unmountOnExit>
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
        onClick={() => {
          setCurrentFolderId(props.folder.id);
        }}
      />
    );
  }
};
