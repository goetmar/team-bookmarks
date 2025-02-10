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
import bookmarksJson from "../data/bookmarks.json";
import { Banner } from "../components/Banner";
import { Entry } from "../components/Entry";
import SearchComboBox from "../components/SearchComboBox";
import { BookmarkItem } from "../types/types";
import { downloadBookmarksFile } from "../utils/fileExport";
import { useState } from "react";
import { isBookmark } from "../utils/bookmarkHelper";

// TODO subfolders and toplevel bookmarks are currently not shown on this page as only top level folders are displayed
const bookmarkFolders: BookmarkItem[] = bookmarksJson;

export const BookmarkPage = () => {
  const [expanded, setExpanded] = useState<number | false>(0);

  const handleChange =
    (panel: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

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
          <Box className={blur ? "blur" : ""} sx={{ width: "100%" }}>
            {bookmarkFolders.map((folder, index) => (
              <Accordion
                expanded={expanded === index}
                onChange={handleChange(index)}
                key={index}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h5" component="div">
                    {folder.name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {!isBookmark(folder) &&
                    folder.bookmarks
                      .filter((b) => isBookmark(b))
                      .map((entry, entryIndex) => (
                        <div key={entryIndex}>
                          <Entry
                            url={entry.url}
                            name={entry.name}
                            clipboard={true}
                          />
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
                downloadBookmarksFile("bookmark_export.html", bookmarksJson);
              }}
            >
              Export Bookmarks
            </Button>
          </Box>
        </Stack>
      </Box>
    </>
  );
};
