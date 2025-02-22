import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useState } from "react";
import {
  capitalize,
  Divider,
  ListItemIcon,
  ListItemText,
  useColorScheme,
} from "@mui/material";
import { Check } from "@mui/icons-material";
import { downloadBookmarksFile } from "../utils/fileExport";
import { useBookmarkStore } from "../hooks/useBookmarkStore";
import { SearchField } from "./SearchField";

export default function AppNavBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const rootFolder = useBookmarkStore((state) => state.rootFolder);
  const { mode, setMode } = useColorScheme();

  type Mode = NonNullable<typeof mode>;
  const modes: Mode[] = ["light", "system", "dark"];

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (modeValue: Mode) => {
    setMode(modeValue);
    handleClose();
  };

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: "blur(10px)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Bookmarks
        </Typography>

        <SearchField />

        <IconButton
          size="large"
          aria-label="file export"
          onClick={() => {
            downloadBookmarksFile("bookmark_export.html", rootFolder.bookmarks);
          }}
          color="inherit"
        >
          <FileDownloadIcon />
        </IconButton>

        <div>
          <IconButton
            size="large"
            aria-label="color mode"
            aria-controls="menu-app-bar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Brightness4Icon />
          </IconButton>
          <Menu
            id="menu-app-bar"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {modes.map((modeValue, index) => {
              if (modeValue !== mode) {
                return (
                  <MenuItem key={index} onClick={() => handleClick(modeValue)}>
                    <ListItemText inset>{capitalize(modeValue)}</ListItemText>
                  </MenuItem>
                );
              } else {
                return (
                  <MenuItem key={index} onClick={() => handleClick(modeValue)}>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    <ListItemText>{capitalize(modeValue)}</ListItemText>
                  </MenuItem>
                );
              }
            })}
          </Menu>
        </div>
      </Toolbar>
      <Divider />
    </AppBar>
  );
}
