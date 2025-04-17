import { DisplaySettings } from "@mui/icons-material";
import { ListItemText, MenuItem, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import { useBookmarkStore } from "../hooks/useBookmarkStore";
import { DisplaySetting } from "../types/types";
import { MenuButton } from "./MenuButton";

export const SettingsButton = () => {
  const settings = useBookmarkStore((state) => state.settings);
  const sortBookmarks = useBookmarkStore((state) => state.sortBookmarks);
  const toggleSetting = useBookmarkStore((state) => state.toggleSetting);
  const [checked, setChecked] = useState(["sort"]);
  const handleToggle = (value: DisplaySetting) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    toggleSetting(value);
  };

  useEffect(() => {
    sortBookmarks(settings.sort);
  }, [settings.sort]);

  const labels: Record<DisplaySetting, string> = {
    sort: "Sort by Name",
    parent: "Show Parent Folder",
    copy: "Show Copy Button",
  };

  return (
    <MenuButton label="Display Settings" icon={<DisplaySettings />}>
      {(Object.keys(settings) as Array<DisplaySetting>).map(
        (setting, index) => {
          return (
            <MenuItem
              key={index}
              sx={{ gap: 2 }}
              onClick={handleToggle(setting)}
            >
              <ListItemText
                id={setting}
                primary={labels[setting]}
                sx={{ m: 0 }}
              />
              <Switch
                size="small"
                edge="end"
                checked={checked.includes(setting)}
                slotProps={{
                  input: {
                    "aria-labelledby": labels[setting],
                  },
                }}
              />
            </MenuItem>
          );
        }
      )}
    </MenuButton>
  );
};
