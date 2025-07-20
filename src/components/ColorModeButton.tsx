import Brightness4Icon from "@mui/icons-material/Brightness4";
import CheckIcon from "@mui/icons-material/Check";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import { useColorScheme } from "@mui/material/styles";
import { capitalize } from "@mui/material/utils";
import { MenuButton } from "./MenuButton";

export const ColorModeButton = () => {
  const { mode, setMode } = useColorScheme();
  type Mode = NonNullable<typeof mode>;
  const modes: Mode[] = ["light", "system", "dark"];

  const handleClick = (modeValue: Mode) => {
    setMode(modeValue);
  };

  return (
    <MenuButton label="Color Mode" icon={<Brightness4Icon />}>
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
                <CheckIcon />
              </ListItemIcon>
              <ListItemText>{capitalize(modeValue)}</ListItemText>
            </MenuItem>
          );
        }
      })}
    </MenuButton>
  );
};
