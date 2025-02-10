import { BookmarkItem } from "../types/types";
import { isBookmark } from "./bookmarkHelper";

function mapBookmarkItems(
  items: BookmarkItem[],
  unixTimestamp: number,
  indentTimes: number = 0
): string {
  const newLineIndent = "\n" + "    ".repeat(indentTimes);
  return items
    .map((item) => {
      if (isBookmark(item)) {
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

function generateFileContent(bookmarkItems: BookmarkItem[]) {
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
  bookmarkItems: BookmarkItem[]
) {
  const fileContent = generateFileContent(bookmarkItems);
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(fileContent)
  );
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
