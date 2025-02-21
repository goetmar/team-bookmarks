import { deepPurple } from "@mui/material/colors";
import { ThemeOptions, createTheme } from "@mui/material/styles";
import { useMemo } from "react";

const lightTheme: ThemeOptions = {
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
  shape: { borderRadius: 8 },
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
