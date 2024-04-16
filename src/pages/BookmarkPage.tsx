import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
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

export type Bookmark = {
  name: string;
  url: string;
};

export type BookmarkList = {
  name: string;
  bookmarks: Bookmark[];
};

const bookmarkLists: BookmarkList[] = bookmarksJson;

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
          {bookmarkLists.map((list, index) => (
            <Accordion
              expanded={expanded === index}
              onChange={handleChange(index)}
              key={index}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h5" component="div" width="900px">
                  {list.name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {list.bookmarks.map((entry, entryIndex) => (
                  <div key={entryIndex}>
                    <Entry url={entry.url} name={entry.name} />
                    {entryIndex !== list.bookmarks.length - 1 ? (
                      <Divider />
                    ) : null}
                  </div>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      </Box>
    </>
  );
};
