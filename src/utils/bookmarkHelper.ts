import { BookmarkItem, Bookmark } from "../types/types";

export function isBookmark(b: BookmarkItem): b is Bookmark {
  return (b as Bookmark).url !== undefined;
}

export function filterBookmarks(
  items: BookmarkItem[],
  arr?: Bookmark[]
): Bookmark[] {
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
