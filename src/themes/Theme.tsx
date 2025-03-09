import { deepPurple } from "@mui/material/colors";
import {
  ColorSystemOptions,
  ThemeOptions,
  createTheme,
} from "@mui/material/styles";
import { useMemo } from "react";

const defaultTheme: ThemeOptions = {
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: ["Montserrat"].join(","),
  },
};

const lightScheme: ColorSystemOptions = {
  palette: {
    background: {
      default: "#eef0f2",
    },
    primary: {
      main: deepPurple[500],
    },
    action: {
      hover: "rgba(0,0,0,0.08)",
      hoverOpacity: 0.08,
      selectedOpacity: 0.16,
    },
  },
};

const darkScheme: ColorSystemOptions = {
  palette: {
    primary: {
      main: deepPurple[200],
    },
  },
};

export const useDefaultTheme = () => {
  const theme = useMemo(
    () =>
      createTheme({
        ...defaultTheme,
        colorSchemes: {
          light: lightScheme,
          dark: darkScheme,
        },
      }),
    []
  );
  return theme;
};
