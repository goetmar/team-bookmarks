import { Box, Button } from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { BookmarkFolder, CardItemStyle } from "../types/types";

export type FolderProps = { folder: BookmarkFolder; style: CardItemStyle };

export const Folder = (props: FolderProps) => {
  return (
    <Button {...props.style.button}>
      <Box {...props.style.box}>
        <FolderOpenIcon fontSize="small" />
        {props.folder.name}
      </Box>
    </Button>
  );
};
