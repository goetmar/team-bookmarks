import { create } from "zustand";
import bookmarksJson from "../data/bookmarks.json";
import { BookmarkFolder } from "../types/types";
import { findFolderById, indexBookmarks } from "../utils/bookmarkHelper";

const rootFolder: BookmarkFolder = {
  id: -1,
  name: bookmarksJson.name || "Bookmarks",
  bookmarks: indexBookmarks(bookmarksJson.bookmarks)[0],
};

type BookmarkStoreState = {
  rootFolder: BookmarkFolder;
  currentFolderId: number;
  isSearching: boolean;
};

type BookmarkStoreActions = {
  getCurrentFolder: () => BookmarkFolder;
  setCurrentFolderId: (id: number) => void;
  setIsSearching: (searching: boolean) => void;
};

type BookmarkStore = BookmarkStoreState & BookmarkStoreActions;

export const useBookmarkStore = create<BookmarkStore>((set, get) => ({
  rootFolder: rootFolder,
  currentFolderId: -1,
  isSearching: false,
  getCurrentFolder: () => {
    return (
      findFolderById(get().rootFolder, get().currentFolderId) ||
      get().rootFolder
    );
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
}));
