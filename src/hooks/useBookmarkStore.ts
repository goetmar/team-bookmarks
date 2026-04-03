import { create } from "zustand";
import bookmarksJson from "../data/example.bookmarks.json";
import { AppSetting, BookmarkFolder, BookmarkItem } from "../types/types";
import {
  getFolderIdByPath,
  getFolderPathById,
  indexBookmarks,
  ROOT_FOLDER_ID,
  sortBookmarks,
} from "../utils/bookmarkHelper";
import {
  normalizeQuery,
  readPathFromUrl,
  readSearchFromUrl,
  replaceUrl,
  setPathInUrl,
} from "../utils/urlHelper";

const indexedBookmarks = indexBookmarks(bookmarksJson.bookmarks)[0];
const sortedBookmarks = sortBookmarks(indexedBookmarks);

const rootFolder: BookmarkFolder = {
  id: ROOT_FOLDER_ID,
  name: bookmarksJson.name || "Bookmarks",
  bookmarks: indexedBookmarks,
};

const defaultSettings: Record<AppSetting, boolean> = {
  sort: true,
  parent: false,
  openInNewTab: false,
};

const storedSettings: Record<AppSetting, boolean> = {
  sort: getLocalSetting("sort"),
  parent: getLocalSetting("parent"),
  openInNewTab: getLocalSetting("openInNewTab"),
};

function getLocalSetting(key: AppSetting): boolean {
  const localSetting = localStorage.getItem(key);
  return localSetting !== null
    ? Boolean(JSON.parse(localSetting))
    : defaultSettings[key];
}

function getFolderIdFromUrl(): number {
  const pathStr = readPathFromUrl();
  if (!pathStr) return ROOT_FOLDER_ID;

  const pathSegments = pathStr.split("/").filter(Boolean);
  const id = getFolderIdByPath(indexedBookmarks, pathSegments);
  if (id !== undefined) return id;

  // invalid path: remove the query param and navigate to root
  setPathInUrl(undefined);
  return ROOT_FOLDER_ID;
}

type BookmarkStoreState = {
  rootFolder: BookmarkFolder;
  currentFolderId: number;
  isSearching: boolean;
  searchResults: BookmarkItem[];
  searchQuery: string;
  settings: Record<AppSetting, boolean>;
};

type BookmarkStoreActions = {
  setCurrentFolderId: (id: number) => void;
  setIsSearching: (searching: boolean) => void;
  setSearchResults: (results: BookmarkItem[]) => void;
  setSearchQuery: (query: string) => void;
  toggleSetting: (setting: AppSetting) => void;
  sortBookmarks: (sort: boolean) => void;
};

type BookmarkStore = BookmarkStoreState & BookmarkStoreActions;

export const useBookmarkStore = create<BookmarkStore>((set, get) => ({
  rootFolder: rootFolder,
  currentFolderId: getFolderIdFromUrl(),
  isSearching: false,
  searchResults: [],
  searchQuery: readSearchFromUrl() ?? "",
  settings: storedSettings,
  setCurrentFolderId: (id: number) => {
    // Selecting a folder clears search and updates path
    const params = new URLSearchParams(window.location.search);
    params.delete("q");

    if (id === ROOT_FOLDER_ID) {
      params.delete("path");
    } else {
      const pathSegments = getFolderPathById(get().rootFolder.bookmarks, id);
      if (pathSegments) {
        params.set("path", pathSegments.join("/"));
      }
    }

    replaceUrl(params);

    set(() => ({
      currentFolderId: id,
      searchQuery: "",
    }));
  },
  setIsSearching: (searching: boolean) => {
    set(() => ({
      isSearching: searching,
    }));
  },
  setSearchResults: (results: BookmarkItem[]) => {
    set(() => ({
      searchResults: results,
    }));
  },
  setSearchQuery: (query: string) => {
    const normalizedQuery = normalizeQuery(query);
    const params = new URLSearchParams(window.location.search);

    if (normalizedQuery.length > 0) {
      // Starting search: clear path and set search query
      params.delete("path");
      params.set("q", normalizedQuery);
    } else {
      // Ending search: restore current folder's path
      params.delete("q");
      const currentFolderId = get().currentFolderId;
      if (currentFolderId !== ROOT_FOLDER_ID) {
        const pathSegments = getFolderPathById(
          get().rootFolder.bookmarks,
          currentFolderId,
        );
        if (pathSegments) params.set("path", pathSegments.join("/"));
      }
    }
    replaceUrl(params);
    set(() => ({
      searchQuery: normalizedQuery,
    }));
  },
  toggleSetting: (setting: AppSetting) => {
    const currentSettings = get().settings;
    const newValue = !currentSettings[setting];
    set(() => ({
      settings: {
        ...currentSettings,
        [setting]: newValue,
      },
    }));
    localStorage.setItem(setting, JSON.stringify(newValue));
  },
  sortBookmarks: (sort: boolean) => {
    set(() => ({
      rootFolder: {
        ...get().rootFolder,
        bookmarks: sort ? sortedBookmarks : indexedBookmarks,
      },
    }));
  },
}));
