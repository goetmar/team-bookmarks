import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { alpha } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import useAutocomplete from "@mui/material/useAutocomplete";
import { useEffect, useMemo, useRef, useState } from "react";
import { useBookmarkStore } from "../hooks/useBookmarkStore";
import useKeyboardShortcut from "../hooks/useKeyboardShortcut";
import { filterBookmarks } from "../utils/bookmarkHelper";

export const SearchField = () => {
  const rootFolder = useBookmarkStore((state) => state.rootFolder);
  const searchQuery = useBookmarkStore((state) => state.searchQuery);
  const setIsSearching = useBookmarkStore((state) => state.setIsSearching);
  const setSearchResults = useBookmarkStore((state) => state.setSearchResults);
  const setSearchQuery = useBookmarkStore((state) => state.setSearchQuery);

  const allBookmarksSorted = useMemo(() => {
    return filterBookmarks([rootFolder]).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }, [rootFolder]);

  const [inputValue, setInputValue] = useState(searchQuery ?? "");

  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  const { groupedOptions, getInputLabelProps, getInputProps } = useAutocomplete(
    {
      id: "use-autocomplete",
      inputValue: inputValue,
      options: allBookmarksSorted,
      getOptionLabel: (option) => option.name,
      open: true,
    },
  );

  useEffect(() => {
    if (searchQuery.length > 0) {
      setSearchResults(groupedOptions);
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [searchQuery, groupedOptions, setSearchResults, setIsSearching]);

  const textInputRef = useRef<HTMLInputElement>(null);

  const focusSearch = (e: KeyboardEvent) => {
    if (!(document.activeElement === textInputRef.current)) {
      textInputRef.current?.focus();
      e.preventDefault();
    }
  };

  useKeyboardShortcut(focusSearch, { key: "/" });

  return (
    <TextField
      size="small"
      type="search"
      label="Search"
      value={inputValue}
      onChange={(e) => {
        const raw = e.target.value;
        setInputValue(raw);
        if (raw !== searchQuery) {
          setSearchQuery(raw);
        }
      }}
      autoFocus
      inputRef={textInputRef}
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
          sx: (theme) => ({
            backgroundColor: alpha(theme.palette.background.default, 0.6),
          }),
          endAdornment: inputValue && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => {
                  setInputValue("");
                  setSearchQuery("");
                  textInputRef.current?.focus();
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
