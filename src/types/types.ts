export type Bookmark = {
  id: number;
  name: string;
  url: string;
};

export type BookmarkFolder = {
  id: number;
  name: string;
  bookmarks: BookmarkItem[];
};

export type BookmarkItem = BookmarkFolder | Bookmark;

export type BookmarkRaw = {
  name: string;
  url: string;
};

export type BookmarkFolderRaw = {
  name: string;
  bookmarks: BookmarkItemRaw[];
};

export type BookmarkItemRaw = BookmarkFolderRaw | BookmarkRaw;

export type DisplaySetting = "sort" | "parent" | "copy" | "openInNewTab";
