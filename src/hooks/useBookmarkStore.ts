import { create } from "zustand";
import bookmarksJson from "../data/bookmarks.json";
import { BookmarkFolder, BookmarkItem } from "../types/types";
import {
  findFolderById,
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
};

type BookmarkStoreActions = {
  getCurrentFolder: () => BookmarkFolder;
  setCurrentFolderId: (id: number) => void;
  setIsSearching: (searching: boolean) => void;
  setSearchResults: (results: BookmarkItem[]) => void;
  sortBookmarks: (sort: boolean) => void;
};

type BookmarkStore = BookmarkStoreState & BookmarkStoreActions;

export const useBookmarkStore = create<BookmarkStore>((set, get) => ({
  rootFolder: rootFolder,
  currentFolderId: -1,
  isSearching: false,
  searchResults: [],
  getCurrentFolder: () => {
    return (
      findFolderById([get().rootFolder], get().currentFolderId) ||
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
  setSearchResults: (results: BookmarkItem[]) => {
    set(() => ({
      searchResults: results,
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
