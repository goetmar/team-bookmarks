import { Box, Button, Stack } from "@mui/material";
import bookmarksJson from "../data/bookmarks.json";
import { Banner } from "../components/Banner";
import SearchComboBox from "../components/SearchComboBox";
import { BookmarkItem } from "../types/types";
import { downloadBookmarksFile } from "../utils/fileExport";
import { useState } from "react";
import { ContentCard } from "../components/ContentCard";

// TODO subfolders are currently not shown on this page as only top level folder is displayed

const bookmarkItems: BookmarkItem[] = bookmarksJson;

export const BookmarkPage = () => {
  const [blur, setBlur] = useState(false);

  return (
    <>
      <Banner />
      <Box display="flex" justifyContent="center" alignItems="center">
        <Stack
          spacing={2}
          alignItems="center"
          mt={2}
          sx={{ "& .blur": { filter: "blur(2px)", pointerEvents: "none" } }}
          width="50vw"
          minWidth={"300px"}
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
            <ContentCard items={bookmarkItems} />
          </Box>
          <Button
            onClick={() => {
              downloadBookmarksFile("bookmark_export.html", bookmarksJson);
            }}
          >
            Export Bookmarks
          </Button>
        </Stack>
      </Box>
    </>
  );
};
