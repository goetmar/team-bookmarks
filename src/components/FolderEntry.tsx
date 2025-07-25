import DriveFolderUploadRoundedIcon from "@mui/icons-material/DriveFolderUploadRounded";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
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
      {props.variant === "up" && (
        <DriveFolderUploadRoundedIcon fontSize="small" />
      )}
      {props.variant === "open" && <FolderOpenIcon fontSize="small" />}
      {props.variant === "close" && <FolderIcon fontSize="small" />}
      {props.folder.name}
    </CardItem>
  );
};
