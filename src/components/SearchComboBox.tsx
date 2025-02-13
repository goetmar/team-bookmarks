import { Autocomplete, TextField } from "@mui/material";
import { filterBookmarks } from "../utils/bookmarkHelper";
import { CardItem } from "./CardItem";
import { useBookmarkStore } from "../hooks/useBookmarkStore";

export type SearchComboBoxProps = {
  onClose?: () => void;
  onOpen?: () => void;
};

export default function SearchComboBox(props: SearchComboBoxProps) {
  const rootFolder = useBookmarkStore((state) => state.rootFolder);
  const allBookmarks = filterBookmarks([rootFolder]);

  return (
    <Autocomplete
      onClose={props.onClose}
      onOpen={props.onOpen}
      fullWidth
      disablePortal
      id="search-combo-box"
      options={allBookmarks.sort((a, b) => a.name.localeCompare(b.name))}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <CardItem
            key={key}
            item={{
              id: option.id,
              name: option.name,
              url: option.url,
            }}
            {...optionProps}
          />
        );
      }}
      renderInput={(params) => (
        <TextField {...params} variant="filled" label="Search" />
      )}
    />
  );
}
