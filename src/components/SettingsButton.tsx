import SettingsIcon from "@mui/icons-material/Settings";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import { useEffect } from "react";
import { useBookmarkStore } from "../hooks/useBookmarkStore";
import { AppSetting } from "../types/types";
import { MenuButton } from "./MenuButton";

export const SettingsButton = () => {
  const settings = useBookmarkStore((state) => state.settings);
  const sortBookmarks = useBookmarkStore((state) => state.sortBookmarks);
  const toggleSetting = useBookmarkStore((state) => state.toggleSetting);

  useEffect(() => {
    sortBookmarks(settings.sort);
  }, [settings.sort, sortBookmarks]);

  const labels: Record<AppSetting, string> = {
    sort: "Sort by Name",
    parent: "Show Parent Folder",
    openInNewTab: "Open Links in new Tab",
  };

  return (
    <MenuButton label="Settings" icon={<SettingsIcon />}>
      {(Object.keys(settings) as Array<AppSetting>).map((setting, index) => {
        return (
          <MenuItem
            key={index}
            sx={{ gap: 2 }}
            onClick={() => toggleSetting(setting)}
          >
            <ListItemText
              id={setting}
              primary={labels[setting]}
              sx={{ m: 0 }}
            />
            <Switch
              size="small"
              edge="end"
              checked={settings[setting]}
              slotProps={{
                input: {
                  "aria-labelledby": labels[setting],
                },
              }}
            />
          </MenuItem>
        );
      })}
    </MenuButton>
  );
};
