import {
  Box,
  Grid2 as Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  useAutocomplete,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { ContentCard } from "../components/ContentCard";
import { useBookmarkStore } from "../hooks/useBookmarkStore";
import { FolderList } from "../components/FolderList";
import { filterBookmarks, filterFolders } from "../utils/bookmarkHelper";
import AppNavBar from "../components/AppNavBar";
import CloseIcon from "@mui/icons-material/Close";

export const BookmarkPage = () => {
  const rootFolder = useBookmarkStore((state) => state.rootFolder);
  const currentFolder = useBookmarkStore((state) => state.getCurrentFolder());
  const isSearching = useBookmarkStore((state) => state.isSearching);
  const setIsSearching = useBookmarkStore((state) => state.setIsSearching);

  const [input, setInput] = useState("");

  const allBookmarksSorted = filterBookmarks([rootFolder]).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const { groupedOptions, getInputLabelProps, getInputProps } = useAutocomplete(
    {
      id: "use-autocomplete",
      inputValue: input,
      options: allBookmarksSorted,
      getOptionLabel: (option) => option.name,
      open: true,
    }
  );

  const items = isSearching ? groupedOptions : currentFolder.bookmarks;

  useEffect(() => {
    if (input.trim().length > 0) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [input]);

  const textInput = useRef<HTMLInputElement>(null);

  return (
    <>
      <AppNavBar
        searchField={
          <TextField
            size="small"
            type="search"
            label="Search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            inputRef={textInput}
            sx={{
              "input::-webkit-search-cancel-button": {
                "-webkit-appearance": "none",
              },
            }}
            slotProps={{
              inputLabel: { ...getInputLabelProps() },
              htmlInput: { ...getInputProps() },
              input: {
                endAdornment: input && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => {
                        setInput("");
                        textInput?.current?.focus();
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        }
      />
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4, lg: 3 }} minWidth={"180px"}>
            <FolderList folders={filterFolders([rootFolder])} />
          </Grid>
          <Grid size={{ xs: 12, md: 8, lg: 6 }} minWidth={"300px"}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Stack spacing={2} alignItems="center" width="100%">
                <Box
                  display="flex"
                  justifyContent="left"
                  alignItems="left"
                  sx={{ width: "100%" }}
                >
                  <ContentCard items={items} />
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
