import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import bookmarksJson from "../data/bookmarks.json";
import { Banner } from "../components/Banner";
import { Entry } from "../components/Entry";
import SearchComboBox from "../components/SearchComboBox";
import { BookmarkItem, isBookmark } from "../types";
import { downloadBookmarksFile } from "../utils/fileExport";

// TODO subfolders and toplevel bookmarks are currently not shown on this page as only top level folders are displayed
const bookmarkFolders: BookmarkItem[] = bookmarksJson;

export const BookmarkPage = () => {
  const [expanded, setExpanded] = React.useState<number | false>(0);

  const handleChange =
    (panel: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      <Banner />
      <Box display="flex" justifyContent="center" alignItems="center">
        <Stack spacing={0} alignItems="center" pt={3}>
          <Box sx={{ pb: 2 }}>
            <SearchComboBox />
          </Box>
          {bookmarkFolders.map((folder, index) => (
            <Accordion
              expanded={expanded === index}
              onChange={handleChange(index)}
              key={index}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h5" component="div" width="900px">
                  {folder.name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {!isBookmark(folder) &&
                  folder.bookmarks
                    .filter((b) => isBookmark(b))
                    .map((entry, entryIndex) => (
                      <div key={entryIndex}>
                        <Entry url={entry.url} name={entry.name} />
                        {entryIndex !== folder.bookmarks.length - 1 ? (
                          <Divider />
                        ) : null}
                      </div>
                    ))}
              </AccordionDetails>
            </Accordion>
          ))}
          <Button
            onClick={() => {
              downloadBookmarksFile("bookmark_export.html");
            }}
          >
            Export Bookmarks
          </Button>
        </Stack>
      </Box>
    </>
  );
};
