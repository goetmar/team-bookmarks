import { IconButton, Menu, Tooltip } from "@mui/material";
import { ReactElement, ReactNode, useState } from "react";

export type MenuButtonProps = {
  label: string;
  icon: ReactElement;
  children: ReactNode;
};

export const MenuButton = (props: MenuButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title={props.label} placement="bottom" arrow disableInteractive>
        <IconButton
          sx={(theme) => ({
            borderRadius: theme.shape.borderRadius + "px",
            backgroundColor: Boolean(anchorEl)
              ? theme.palette.action.hover
              : null,
          })}
          color="inherit"
          aria-label={props.label}
          onClick={handleMenu}
        >
          {props.icon}
        </IconButton>
      </Tooltip>
      <Menu
        autoFocus={false}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          list: { sx: (theme) => ({ py: theme.shape.borderRadius + "px" }) },
        }}
      >
        {props.children}
      </Menu>
    </>
  );
};
