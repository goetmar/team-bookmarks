import { CssBaseline, ThemeProvider, useColorScheme } from "@mui/material";
import { BookmarkPage } from "./pages/BookmarkPage";
import { useDefaultTheme } from "./themes/Theme";

function AppContent() {
  const { mode } = useColorScheme();
  if (!mode) {
    return null;
  }
  return (
    <>
      <CssBaseline />
      <BookmarkPage />
    </>
  );
}

export const App = () => {
  return (
    <ThemeProvider theme={useDefaultTheme()}>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
