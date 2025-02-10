export type Bookmark = {
  name: string;
  url: string;
};

export type BookmarkFolder = {
  name: string;
  bookmarks: BookmarkItem[];
};

export type BookmarkItem = BookmarkFolder | Bookmark;
