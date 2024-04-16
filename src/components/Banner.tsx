import { Box, Typography } from "@mui/material";

export const Banner = () => {
  return (
    <Box
      sx={{ bgcolor: "#222222" }}
      display="flex"
      justifyContent="center"
      py={2}
    >
      <Typography
        variant="h1"
        color="primary"
        sx={{
          span: {
            color: "white",
          },
        }}
      >
        <span color="primary">Bookmark</span> Collection
      </Typography>
    </Box>
  );
};
