import bookmarksJson from "../data/bookmarks.json";
import { BookmarkList, Bookmark } from "../pages/BookmarkPage";
import { Entry } from "./Entry";
import { Autocomplete, TextField } from "@mui/material";

const bookmarkLists: BookmarkList[] = bookmarksJson;
let allBookmarks: Bookmark[] = [];
bookmarkLists.forEach((list) => {
  allBookmarks = allBookmarks.concat(
    list.bookmarks.map((entry) => {
      return entry;
    })
  );
});

export default function SearchComboBox() {
  return (
    <Autocomplete
      disablePortal
      id="search-combo-box"
      options={allBookmarks.map((option) => option.name)}
      sx={{ width: 500 }}
      renderOption={(props, option) => (
        <Entry
          {...props}
          name={option}
          url={allBookmarks.find((bm) => bm.name === option)?.url || ""}
        />
      )}
      renderInput={(params) => (
        <TextField {...params} variant="filled" label="Search" />
      )}
    />
  );
}
