import { Grid2 as Grid } from "@mui/material";
import { ContentCard } from "../components/ContentCard";
import { useBookmarkStore } from "../hooks/useBookmarkStore";
import { FolderList } from "../components/FolderList";
import { filterFolders } from "../utils/bookmarkHelper";
import AppNavBar from "../components/AppNavBar";

export const BookmarkPage = () => {
  const rootFolder = useBookmarkStore((state) => state.rootFolder);
  const cardItems = useBookmarkStore((state) => state.getCardItems());

  return (
    <>
      <AppNavBar />
      <Grid container spacing={2} p={2}>
        <Grid size={{ xs: 12, md: 4, lg: 3 }} minWidth={"180px"}>
          <FolderList folders={filterFolders([rootFolder])} />
        </Grid>
        <Grid size={{ xs: 12, md: 8, lg: 6 }} minWidth={"300px"}>
          <ContentCard items={cardItems} />
        </Grid>
      </Grid>
    </>
  );
};
