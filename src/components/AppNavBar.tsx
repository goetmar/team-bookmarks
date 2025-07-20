import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ColorModeButton } from "./ColorModeButton";
import { MoreButton } from "./MoreButton";
import { SearchField } from "./SearchField";
import { SettingsButton } from "./SettingsButton";

export default function AppNavBar() {
  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={(theme) => ({
        backdropFilter: "blur(8px)",
        zIndex: theme.zIndex.drawer + 1,
      })}
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
          <ColorModeButton />
          <SettingsButton />
          <MoreButton />
        </Box>
      </Toolbar>
      <Divider />
    </AppBar>
  );
}
