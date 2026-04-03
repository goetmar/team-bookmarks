import cloneDeep from "lodash.clonedeep";
import {
  Bookmark,
  BookmarkFolder,
  BookmarkItem,
  BookmarkItemRaw,
  BookmarkRaw,
} from "../types/types";

export function isBookmark(b: BookmarkItem): b is Bookmark {
  return (b as Bookmark).url !== undefined;
}

export function isBookmarkRaw(b: BookmarkItemRaw): b is BookmarkRaw {
  return (b as BookmarkRaw).url !== undefined;
}

export function filterBookmarks(items: BookmarkItem[]): Bookmark[] {
  const itemsCopy = cloneDeep(items);
  let bookmarks: Bookmark[] = [];
  itemsCopy.forEach((item) => {
    if (isBookmark(item)) {
      bookmarks.push(item);
    } else {
      bookmarks = bookmarks.concat(filterBookmarks(item.bookmarks));
    }
  });
  return bookmarks;
}

export function filterFolders(items: BookmarkItem[]): BookmarkFolder[] {
  const itemsCopy = cloneDeep(items);
  const folders: BookmarkFolder[] = [];
  itemsCopy.forEach((item) => {
    if (!isBookmark(item)) {
      folders.push(item);
    }
  });
  folders.forEach(
    (folder) => (folder.bookmarks = filterFolders(folder.bookmarks)),
  );
  return folders;
}

export const ROOT_FOLDER_ID = -1;

/**
 * Assign sequential numeric ids to bookmarks and folders.
 * @returns indexed items and the next available id.
 */
export function indexBookmarks(
  items: BookmarkItemRaw[],
  startId?: number,
): [BookmarkItem[], number] {
  const itemsCopy = cloneDeep(items);
  const bookmarks: BookmarkItem[] = [];
  let index = startId ?? 0;
  itemsCopy.forEach((item) => {
    if (isBookmarkRaw(item)) {
      bookmarks.push({ ...item, id: index++ });
    } else {
      const [subfolder, prevId] = indexBookmarks(item.bookmarks, index);
      index = prevId;
      bookmarks.push({
        id: index++,
        name: item.name,
        bookmarks: subfolder,
      });
    }
  });
  return [bookmarks, index];
}

export function findFolderById(
  items: BookmarkItem[],
  id: number,
): BookmarkFolder | undefined {
  let result: BookmarkFolder | undefined;
  items.some((item) => {
    if (!isBookmark(item)) {
      if (item.id === id) {
        return (result = item);
      }
      return (result = findFolderById(item.bookmarks, id));
    }
  });
  return result;
}

export function findParentFolderById(
  folder: BookmarkFolder,
  id: number,
): BookmarkFolder | undefined {
  let result: BookmarkFolder | undefined;
  folder.bookmarks.some((item) => {
    if (!isBookmark(item)) {
      if (item.id === id) {
        return (result = folder);
      }
      return (result = findParentFolderById(item, id));
    }
  });
  return result;
}

export function sortBookmarks(
  items: BookmarkItem[],
  copy = true,
): BookmarkItem[] {
  const result: BookmarkItem[] = copy ? cloneDeep(items) : items;
  result.sort((a, b) => {
    if (isBookmark(a) && !isBookmark(b)) {
      return 1;
    } else if (!isBookmark(a) && isBookmark(b)) {
      return -1;
    }
    return a.name.localeCompare(b.name);
  });
  result.forEach(
    (item) => !isBookmark(item) && sortBookmarks(item.bookmarks, false),
  );
  return result;
}

export function getFolderPathById(
  items: BookmarkItem[],
  id: number,
  currentPath: string[] = [],
): string[] | undefined {
  for (const item of items) {
    if (!isBookmark(item)) {
      if (item.id === id) {
        return [...currentPath, item.name];
      }
      const result = getFolderPathById(item.bookmarks, id, [
        ...currentPath,
        item.name,
      ]);
      if (result) return result;
    }
  }
  return undefined;
}

export function getFolderIdByPath(
  items: BookmarkItem[],
  pathSegments: string[],
): number | undefined {
  if (pathSegments.length === 0) return ROOT_FOLDER_ID;

  let current = items;
  let lastFolder: BookmarkFolder | undefined;
  for (const segment of pathSegments) {
    const folder = current.find(
      (item) => !isBookmark(item) && item.name === segment,
    ) as BookmarkFolder | undefined;
    if (!folder) return undefined;
    lastFolder = folder;
    current = folder.bookmarks;
  }

  return lastFolder?.id;
}
