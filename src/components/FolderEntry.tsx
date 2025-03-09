import {
  DriveFolderUploadRounded,
  Folder,
  FolderOpen,
} from "@mui/icons-material";
import { useBookmarkStore } from "../hooks/useBookmarkStore";
import { BookmarkFolder } from "../types/types";
import { CardItem } from "./CardItem";

export type FolderEntryProps = {
  folder: BookmarkFolder;
  variant: "up" | "open" | "close";
};

export const FolderEntry = (props: FolderEntryProps) => {
  const setCurrentFolderId = useBookmarkStore(
    (state) => state.setCurrentFolderId
  );
  return (
    <CardItem
      buttonProps={
        props.variant === "open"
          ? {
              sx: {
                color: "text.primary",
                cursor: "default",
                fontWeight: 500,
              },
            }
          : {
              onClick: () => {
                setCurrentFolderId(props.folder.id);
              },
            }
      }
    >
      {props.variant === "up" && <DriveFolderUploadRounded fontSize="small" />}
      {props.variant === "open" && <FolderOpen fontSize="small" />}
      {props.variant === "close" && <Folder fontSize="small" />}
      {props.folder.name}
    </CardItem>
  );
};
