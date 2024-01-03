import { Box, styled } from "@mui/material";

export const NonMobileBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flex: 1,
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
      display: "none",
  },
}));

export default NonMobileBox;