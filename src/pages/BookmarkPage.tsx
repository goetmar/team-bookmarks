import { Box, Button, Grid2 as Grid, Stack } from "@mui/material";
import bookmarksJson from "../data/bookmarks.json";
import { Banner } from "../components/Banner";
import SearchComboBox from "../components/SearchComboBox";
import { BookmarkItem } from "../types/types";
import { downloadBookmarksFile } from "../utils/fileExport";
import { useState } from "react";
import { ContentCard } from "../components/ContentCard";
import { FolderMenu } from "../components/FolderMenu";

// TODO subfolders are currently not shown on this page as only top level folder is displayed

const bookmarkItems: BookmarkItem[] = bookmarksJson;

export const BookmarkPage = () => {
  const [blur, setBlur] = useState(false);

  return (
    <>
      <Banner />
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4, lg: 3 }} minWidth={"180px"}>
            <FolderMenu items={bookmarkItems} />
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
                  items={bookmarkItems}
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
                  <ContentCard items={bookmarkItems} />
                </Box>
                <Button
                  onClick={() => {
                    downloadBookmarksFile(
                      "bookmark_export.html",
                      bookmarkItems
                    );
                  }}
                >
                  Export Bookmarks
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
