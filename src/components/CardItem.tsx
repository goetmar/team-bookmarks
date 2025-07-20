import Box, { BoxProps } from "@mui/material/Box";
import Button, { ButtonProps } from "@mui/material/Button";
import { ReactNode } from "react";

const boxProps: BoxProps = {
  display: "flex",
  alignItems: "center",
  gap: 2,
  sx: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    minWidth: "100%",
    width: 0,
  },
};

// target and rel are only valid if href is set
type LinkProps =
  | { href?: never; target?: never; rel?: never }
  | { href: string; target?: string; rel?: string };

export type CardItemProps = {
  buttonProps?: ButtonProps & LinkProps;
  children?: ReactNode;
};

export const CardItem = (props: CardItemProps) => {
  return (
    <Button
      fullWidth
      {...props.buttonProps}
      sx={{
        justifyContent: "flex-start",
        borderRadius: 0,
        px: 2,
        textTransform: "none",
        ...props.buttonProps?.sx,
      }}
    >
      <Box {...boxProps}>{props.children}</Box>
    </Button>
  );
};
