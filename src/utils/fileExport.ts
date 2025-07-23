import { BookmarkItemRaw } from "../types/types";
import { isBookmarkRaw } from "./bookmarkHelper";

function mapBookmarkItems(
  items: BookmarkItemRaw[],
  unixTimestamp: number,
  indentTimes = 0
): string {
  const newLineIndent = "\n" + "    ".repeat(indentTimes);
  return items
    .map((item) => {
      if (isBookmarkRaw(item)) {
        return `<DT><A HREF="${item.url}" ADD_DATE="${unixTimestamp}">${item.name}</A>`;
      } else {
        return (
          `<DT><H3 ADD_DATE="${unixTimestamp}" LAST_MODIFIED="${unixTimestamp}">${item.name}</H3>` +
          `${newLineIndent}<DL><p>` +
          `${newLineIndent}    ${mapBookmarkItems(
            item.bookmarks,
            unixTimestamp,
            indentTimes + 1
          )}` +
          `${newLineIndent}</DL><p>`
        );
      }
    })
    .join(newLineIndent);
}

function generateFileContent(bookmarkItems: BookmarkItemRaw[]) {
  return `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!-- This is an automatically generated file. 
     It will be read and overwritten. 
     DO NOT EDIT! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>
    ${mapBookmarkItems(bookmarkItems, new Date().valueOf(), 1)}
</DL><p>
`;
}

export function downloadBookmarksFile(
  filename: string,
  bookmarkItems: BookmarkItemRaw[]
) {
  const fileContent = generateFileContent(bookmarkItems);
  const link = document.createElement("a");
  link.href =
    "data:text/plain;charset=utf-8," + encodeURIComponent(fileContent);
  link.download = filename;
  link.click();
  // TODO I might need to put the element in the DOM for firefox, need to check that
}
