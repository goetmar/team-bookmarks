import { deepPurple } from "@mui/material/colors";
import { ThemeOptions, createTheme } from "@mui/material/styles";
import { useMemo } from "react";

const lightTheme: ThemeOptions = {
  palette: {
    background: {
      default: deepPurple[50],
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
  typography: {
    fontFamily: ["Montserrat"].join(","),
  },
};

const darkTheme: ThemeOptions = {
  palette: {
    primary: {
      main: deepPurple[200],
    },
  },
  typography: {
    fontFamily: ["Montserrat"].join(","),
  },
};

export const useDefaultTheme = () => {
  const theme = useMemo(
    () =>
      createTheme({
        ...lightTheme,
        colorSchemes: {
          dark: darkTheme,
        },
      }),
    []
  );
  return theme;
};
