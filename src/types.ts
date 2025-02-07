export type Bookmark = {
  name: string;
  url: string;
};

export type BookmarkFolder = {
  name: string;
  bookmarks: BookmarkItem[];
};

export type BookmarkItem = BookmarkFolder | Bookmark;

export function isBookmark(b: BookmarkItem): b is Bookmark {
  return (b as Bookmark).url !== undefined;
}
