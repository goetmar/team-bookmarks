import { CssBaseline, ThemeProvider } from "@mui/material";
import { BookmarkPage } from "./pages/BookmarkPage";
import { useDefaultTheme } from "./themes/Theme";

export const App = () => {
  return (
    <ThemeProvider theme={useDefaultTheme()}>
      <CssBaseline />
      <BookmarkPage />
    </ThemeProvider>
  );
}

export default App
