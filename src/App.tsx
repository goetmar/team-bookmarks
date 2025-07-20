import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, useColorScheme } from "@mui/material/styles";
import { BookmarkPage } from "./pages/BookmarkPage";
import { useDefaultTheme } from "./themes/Theme";

function AppContent() {
  const { mode } = useColorScheme();
  if (!mode) {
    return null;
  }
  return (
    <>
      <CssBaseline enableColorScheme />
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
