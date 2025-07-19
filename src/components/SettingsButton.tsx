import { Settings } from "@mui/icons-material";
import { ListItemText, MenuItem, Switch } from "@mui/material";
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
  }, [settings.sort]);

  const labels: Record<AppSetting, string> = {
    sort: "Sort by Name",
    parent: "Show Parent Folder",
    copy: "Show Copy Button",
    openInNewTab: "Open in new Tab",
  };

  return (
    <MenuButton label="Settings" icon={<Settings />}>
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
