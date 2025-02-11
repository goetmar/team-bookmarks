import bookmarksJson from "../data/bookmarks.json";
import { Autocomplete, TextField } from "@mui/material";
import { filterBookmarks } from "../utils/bookmarkHelper";
import { CardItem } from "./CardItem";
import { BookmarkItem } from "../types/types";

export type SearchComboBoxProps = {
  items: BookmarkItem[];
  onClose?: () => void;
  onOpen?: () => void;
};

export default function SearchComboBox(props: SearchComboBoxProps) {
  const allBookmarks = filterBookmarks(bookmarksJson);

  return (
    <Autocomplete
      onClose={props.onClose}
      onOpen={props.onOpen}
      disablePortal
      id="search-combo-box"
      options={allBookmarks.map((option) => option.name).sort()}
      fullWidth
      renderOption={(props, option) => (
        <CardItem
          {...props}
          item={{
            name: option,
            url: allBookmarks.find((bm) => bm.name === option)?.url || "",
          }}
        />
      )}
      renderInput={(params) => (
        <TextField {...params} variant="filled" label="Search" />
      )}
    />
  );
}
