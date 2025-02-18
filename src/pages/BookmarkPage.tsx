import { Box, Button, Grid2 as Grid, Stack } from "@mui/material";
import SearchComboBox from "../components/SearchComboBox";
import { downloadBookmarksFile } from "../utils/fileExport";
import { useState } from "react";
import { ContentCard } from "../components/ContentCard";
import { useBookmarkStore } from "../hooks/useBookmarkStore";
import { FolderList } from "../components/FolderList";
import { filterFolders } from "../utils/bookmarkHelper";
import { ColorModeToggle } from "../components/ColorModeToggle";
import MenuAppBar from "../components/AppNavBar";

export const BookmarkPage = () => {
  const rootFolder = useBookmarkStore((state) => state.rootFolder);
  const [blur, setBlur] = useState(false);

  return (
    <>
      <MenuAppBar />
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4, lg: 3 }} minWidth={"180px"}>
            <FolderList folders={filterFolders([rootFolder])} />
          </Grid>
          <Grid size={{ xs: 12, md: 8, lg: 6 }} minWidth={"300px"}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Stack
                spacing={2}
                alignItems="center"
                sx={{
                  "& .blur": { filter: "blur(2px)", pointerEvents: "none" },
                }}
                width="100%"
              >
                <SearchComboBox
                  onClose={() => {
                    setBlur(false);
                  }}
                  onOpen={() => {
                    setBlur(true);
                  }}
                />
                <Box
                  className={blur ? "blur" : ""}
                  display="flex"
                  justifyContent="left"
                  alignItems="left"
                  sx={{ width: "100%" }}
                >
                  <ContentCard />
                </Box>
                <Button
                  onClick={() => {
                    downloadBookmarksFile(
                      "bookmark_export.html",
                      rootFolder.bookmarks
                    );
                  }}
                >
                  Export Bookmarks
                </Button>
              </Stack>
            </Box>
          </Grid>
          <ColorModeToggle />
        </Grid>
      </Box>
    </>
  );
};
