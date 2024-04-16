import { ThemeOptions, createTheme } from "@mui/material/styles";
import { useMemo } from "react";

const defaultTheme: ThemeOptions = {
  palette: {
    background: {
      default: "#f0e7e7",
    },
    primary: {
      main: "#D4021D",
    },
    secondary: {
      main: "#222222",
    },
  },
  typography: {
    fontFamily: ["Montserrat"].join(","),
  },
};

export const useDefaultTheme = () => {
  const theme = useMemo(() => createTheme(defaultTheme), []);
  return theme;
};
