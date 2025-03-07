import {
  Brightness4,
  Check,
  FileDownload,
  Settings,
} from "@mui/icons-material";
import {
  Box,
  capitalize,
  Divider,
  ListItemIcon,
  ListItemText,
  useColorScheme,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useBookmarkStore } from "../hooks/useBookmarkStore";
import { downloadBookmarksFile } from "../utils/fileExport";
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
      <Toolbar sx={{ gap: 1 }}>
        <Box
          sx={{
            flex: "1 1 var(--drawer-width, 0)",
            whiteSpace: "nowrap",
            //maybe hide text overflow
            //overflowX: "hidden",
          }}
        >
          <Typography variant="h6">Team Bookmarks</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            minWidth: 200,
            flex: "1 1 auto",
            justifyContent: "center",
          }}
        >
          <SearchField />
        </Box>

        <Box
          sx={{
            display: "inline-flex",
            flex: "1 1 0",
            justifyContent: "end",
          }}
          gap={1}
        >
          <IconButton
            color="inherit"
            sx={{ borderRadius: (theme) => theme.shape.borderRadius + "px" }}
          >
            <Settings />
          </IconButton>

          <IconButton
            sx={{ borderRadius: (theme) => theme.shape.borderRadius + "px" }}
            aria-label="file export"
            onClick={() => {
              downloadBookmarksFile(
                "bookmark_export.html",
                rootFolder.bookmarks
              );
            }}
            color="inherit"
          >
            <FileDownload />
          </IconButton>

          <div>
            <IconButton
              sx={{ borderRadius: (theme) => theme.shape.borderRadius + "px" }}
              aria-label="color mode"
              aria-controls="menu-app-bar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Brightness4 />
            </IconButton>
            <Menu
              id="menu-app-bar"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              slotProps={{
                list: {
                  sx: { py: (theme) => theme.shape.borderRadius + "px" },
                },
              }}
            >
              {modes.map((modeValue, index) => {
                if (modeValue !== mode) {
                  return (
                    <MenuItem
                      key={index}
                      onClick={() => handleClick(modeValue)}
                    >
                      <ListItemText inset>{capitalize(modeValue)}</ListItemText>
                    </MenuItem>
                  );
                } else {
                  return (
                    <MenuItem
                      key={index}
                      onClick={() => handleClick(modeValue)}
                    >
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
        </Box>
      </Toolbar>
      <Divider />
    </AppBar>
  );
}
