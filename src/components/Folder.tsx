import { Box, Button } from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { BookmarkFolder } from "../types/types";

export type FolderProps = { folder: BookmarkFolder };

export const Folder = (props: FolderProps) => {
  return (
    <Button fullWidth style={{ justifyContent: "flex-start" }}>
      <Box display="flex" alignItems="center" gap={2}>
        <FolderOpenIcon fontSize="small" />
        {props.folder.name}
      </Box>
    </Button>
  );
};
