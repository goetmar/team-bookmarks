import bookmarksJson from "../data/bookmarks.json";
import { Bookmark, BookmarkItem, isBookmark } from "../types";
import { Entry } from "./Entry";
import { Autocomplete, TextField } from "@mui/material";

function filterBookmarks(items: BookmarkItem[], arr?: Bookmark[]): Bookmark[] {
  let bookmarks = arr || [];
  items.map((item) => {
    if (isBookmark(item)) {
      bookmarks.push(item);
    } else {
      bookmarks = bookmarks.concat(filterBookmarks(item.bookmarks));
    }
  });
  return bookmarks;
}

const allBookmarks = filterBookmarks(bookmarksJson);

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
