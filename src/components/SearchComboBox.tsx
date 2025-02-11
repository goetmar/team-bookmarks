import { Autocomplete, TextField } from "@mui/material";
import { filterBookmarks } from "../utils/bookmarkHelper";
import { CardItem } from "./CardItem";
import { BookmarkItem } from "../types/types";

export type SearchComboBoxProps = {
  items: BookmarkItem[];
  onClose?: () => void;
  onOpen?: () => void;
};

export default function SearchComboBox(props: SearchComboBoxProps) {
  const allBookmarks = filterBookmarks(props.items);

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
