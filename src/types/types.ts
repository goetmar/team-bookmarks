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

export type AppSetting = "sort" | "parent" | "openInNewTab";

export function generateTypeCheck<T extends object, K extends T>(
  requiredFields: [string, ...string[]]
) {
  return (value: T): value is K => {
    return requiredFields.every((field) => field in value);
  };
}
