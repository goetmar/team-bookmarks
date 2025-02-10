import bookmarksJson from "../data/bookmarks.json";
import { Entry } from "./Entry";
import { Autocomplete, TextField } from "@mui/material";
import { filterBookmarks } from "../utils/bookmarkHelper";

const allBookmarks = filterBookmarks(bookmarksJson);

export type SearchComboBoxProps = {
  onClose?: () => void;
  onOpen?: () => void;
};

export default function SearchComboBox(props: SearchComboBoxProps) {
  return (
    <Autocomplete
      onClose={props.onClose}
      onOpen={props.onOpen}
      disablePortal
      id="search-combo-box"
      options={allBookmarks.map((option) => option.name).sort()}
      fullWidth
      renderOption={(props, option) => (
        <Entry
          {...props}
          bookmark={{
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
