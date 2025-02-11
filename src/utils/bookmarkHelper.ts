import { BookmarkItem, Bookmark, BookmarkFolder } from "../types/types";

export function isBookmark(b: BookmarkItem): b is Bookmark {
  return (b as Bookmark).url !== undefined;
}

export function filterBookmarks(items: BookmarkItem[]): Bookmark[] {
  let bookmarks: Bookmark[] = [];
  items.map((item) => {
    if (isBookmark(item)) {
      bookmarks.push(item);
    } else {
      bookmarks = bookmarks.concat(filterBookmarks(item.bookmarks));
    }
  });
  return bookmarks;
}

export function filterFolders(items: BookmarkItem[]): BookmarkFolder[] {
  const folders: BookmarkFolder[] = [];
  items.map((item) => {
    if (!isBookmark(item)) {
      folders.push(item);
    }
  });
  folders.forEach(
    (folder) => (folder.bookmarks = filterFolders(folder.bookmarks))
  );
  return folders;
}
