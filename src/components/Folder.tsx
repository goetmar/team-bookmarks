import { Box, Button } from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { BookmarkFolder, CardItemStyle } from "../types/types";
import { useBookmarkStore } from "../hooks/useBookmarkStore";

export type FolderProps = { folder: BookmarkFolder; style: CardItemStyle };

export const Folder = (props: FolderProps) => {
  const setCurrentFolderId = useBookmarkStore(
    (state) => state.setCurrentFolderId
  );
  return (
    <Button
      {...props.style.button}
      onClick={() => {
        setCurrentFolderId(props.folder.id);
      }}
    >
      <Box {...props.style.box}>
        <FolderOpenIcon fontSize="small" />
        {props.folder.name}
      </Box>
    </Button>
  );
};
