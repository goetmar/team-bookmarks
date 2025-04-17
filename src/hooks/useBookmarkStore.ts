import { create } from "zustand";
import bookmarksJson from "../data/bookmarks.json";
import { BookmarkFolder, BookmarkItem, DisplaySetting } from "../types/types";
import {
  findFolderById,
  findParentFolderById,
  indexBookmarks,
  sortBookmarks,
} from "../utils/bookmarkHelper";

const indexedBookmarks = indexBookmarks(bookmarksJson.bookmarks)[0];
const sortedBookmarks = sortBookmarks(indexedBookmarks);

const rootFolder: BookmarkFolder = {
  id: -1,
  name: bookmarksJson.name || "Bookmarks",
  bookmarks: indexedBookmarks,
};

type BookmarkStoreState = {
  rootFolder: BookmarkFolder;
  currentFolderId: number;
  isSearching: boolean;
  searchResults: BookmarkItem[];
  settings: Record<DisplaySetting, boolean>;
};

type BookmarkStoreActions = {
  getParentFolder: () => BookmarkFolder | undefined;
  getCurrentFolder: () => BookmarkFolder | undefined;
  setCurrentFolderId: (id: number) => void;
  setIsSearching: (searching: boolean) => void;
  setSearchResults: (results: BookmarkItem[]) => void;
  toggleSetting: (setting: DisplaySetting) => void;
  sortBookmarks: (sort: boolean) => void;
};

type BookmarkStore = BookmarkStoreState & BookmarkStoreActions;

export const useBookmarkStore = create<BookmarkStore>((set, get) => ({
  rootFolder: rootFolder,
  currentFolderId: -1,
  isSearching: false,
  searchResults: [],
  settings: { sort: true, parent: false, copy: false },
  getParentFolder: () => {
    return findParentFolderById(get().rootFolder, get().currentFolderId);
  },
  getCurrentFolder: () => {
    return findFolderById([get().rootFolder], get().currentFolderId);
  },
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
  toggleSetting: (setting: DisplaySetting) => {
    set(() => ({
      settings: {
        ...get().settings,
        [setting]: !get().settings[setting],
      },
    }));
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
