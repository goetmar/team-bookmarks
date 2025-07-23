import { create } from "zustand";
import bookmarksJson from "../data/example.bookmarks.json";
import { AppSetting, BookmarkFolder, BookmarkItem } from "../types/types";
import { indexBookmarks, sortBookmarks } from "../utils/bookmarkHelper";

const indexedBookmarks = indexBookmarks(bookmarksJson.bookmarks)[0];
const sortedBookmarks = sortBookmarks(indexedBookmarks);

const rootFolder: BookmarkFolder = {
  id: -1,
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

type BookmarkStoreState = {
  rootFolder: BookmarkFolder;
  currentFolderId: number;
  isSearching: boolean;
  searchResults: BookmarkItem[];
  settings: Record<AppSetting, boolean>;
};

type BookmarkStoreActions = {
  setCurrentFolderId: (id: number) => void;
  setIsSearching: (searching: boolean) => void;
  setSearchResults: (results: BookmarkItem[]) => void;
  toggleSetting: (setting: AppSetting) => void;
  sortBookmarks: (sort: boolean) => void;
};

type BookmarkStore = BookmarkStoreState & BookmarkStoreActions;

export const useBookmarkStore = create<BookmarkStore>((set, get) => ({
  rootFolder: rootFolder,
  currentFolderId: -1,
  isSearching: false,
  searchResults: [],
  settings: storedSettings,
  setCurrentFolderId: (id: number) => {
    set(() => ({
      currentFolderId: id,
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
