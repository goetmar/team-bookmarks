import CloseIcon from "@mui/icons-material/Close";
import {
  IconButton,
  InputAdornment,
  TextField,
  useAutocomplete,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useBookmarkStore } from "../hooks/useBookmarkStore";
import { filterBookmarks } from "../utils/bookmarkHelper";

export const SearchField = () => {
  const rootFolder = useBookmarkStore((state) => state.rootFolder);
  const setIsSearching = useBookmarkStore((state) => state.setIsSearching);
  const setSearchResults = useBookmarkStore((state) => state.setSearchResults);

  const allBookmarksSorted = filterBookmarks([rootFolder]).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const [searchValue, setSearchValue] = useState("");

  const { groupedOptions, getInputLabelProps, getInputProps } = useAutocomplete(
    {
      id: "use-autocomplete",
      inputValue: searchValue,
      options: allBookmarksSorted,
      getOptionLabel: (option) => option.name,
      open: true,
    }
  );

  useEffect(() => {
    if (searchValue.trim().length > 0) {
      setSearchResults(groupedOptions);
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [searchValue]);

  const textInput = useRef<HTMLInputElement>(null);

  return (
    <TextField
      size="small"
      type="search"
      label="Search"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      inputRef={textInput}
      sx={{
        width: 300,
        "input::-webkit-search-cancel-button": {
          WebkitAppearance: "none",
        },
      }}
      slotProps={{
        inputLabel: { ...getInputLabelProps() },
        htmlInput: { ...getInputProps() },
        input: {
          endAdornment: searchValue && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => {
                  setSearchValue("");
                  textInput.current?.focus();
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
