import { Box, styled } from "@mui/material";

const MobileBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    // width: "100vw",
    // height: "100vh",
    [theme.breakpoints.up("sm")]: {
        display: "none",
    },
}));

export default MobileBox;
