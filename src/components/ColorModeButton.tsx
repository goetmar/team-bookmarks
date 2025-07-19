import { Brightness4, Check } from "@mui/icons-material";
import {
  capitalize,
  ListItemIcon,
  ListItemText,
  MenuItem,
  useColorScheme,
} from "@mui/material";
import { MenuButton } from "./MenuButton";

export const ColorModeButton = () => {
  const { mode, setMode } = useColorScheme();
  type Mode = NonNullable<typeof mode>;
  const modes: Mode[] = ["light", "system", "dark"];

  const handleClick = (modeValue: Mode) => {
    setMode(modeValue);
  };

  return (
    <MenuButton label="Color Mode" icon={<Brightness4 />}>
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
    </MenuButton>
  );
};
